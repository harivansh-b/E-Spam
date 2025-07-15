from flask import request, jsonify, Blueprint
import pickle
import os
import uuid
from werkzeug.utils import secure_filename
from .utils import extract_email_body
from .config import Config

bp = Blueprint('bp', __name__, url_prefix='/api')

# Paths for your pickle files
base_path = os.path.dirname(__file__)
model_path = os.path.join(base_path, 'models', 'spam_classifier_model.pkl')
vectorizer_path = os.path.join(base_path, 'models', 'count_vectorizer.pkl')

# Load vectorizer and model once during startup
with open(vectorizer_path, 'rb') as f:
    vectorizer = pickle.load(f)

with open(model_path, 'rb') as f:
    model = pickle.load(f)

@bp.route('/upload', methods=['POST'])
def upload_email():
    try:
        # Check if file is present in request
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        # Secure the filename and check extension
        filename = secure_filename(file.filename)
        file_ext = os.path.splitext(filename)[1].lower()

        if file_ext not in ['.pdf', '.eml']:
            return jsonify({"error": "Unsupported file type. Please upload a PDF or EML file."}), 400

        # Ensure upload folder exists
        if not os.path.exists(Config.UPLOAD_FOLDER):
            os.makedirs(Config.UPLOAD_FOLDER)

        # Generate UUID filename to avoid conflicts
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        save_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
        
        # Save the file temporarily
        file.save(save_path)

        # Extract text from the saved file
        extracted_text = extract_email_body(save_path)
        
        # Clean up - delete the temporary file
        if os.path.exists(save_path):
            os.remove(save_path)
        
        # Check if extraction was successful
        if not extracted_text or extracted_text.strip() == "":
            return jsonify({"error": "Could not extract text from the file."}), 400

        # Return the extracted message
        return jsonify({
            "message": extracted_text,
            "status": "success"
        })

    except Exception as e:
        # Clean up file in case of error
        if 'save_path' in locals() and os.path.exists(save_path):
            os.remove(save_path)
        
        return jsonify({"error": str(e)}), 500


@bp.route('/predict', methods=['POST'])
def predict_spam():
    try:
        data = request.get_json()
        text = data.get("text")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Transform text using the loaded CountVectorizer
        text_vector = vectorizer.transform([text])

        # Get the prediction from the loaded model
        prediction_label = model.predict(text_vector)[0]  # e.g., 'Spam' or 'Not spam'

        # Map label to numerical value
        label_map = {"Not spam": 0, "Spam": 1}
        prediction_int = label_map.get(prediction_label, -1)

        # Return both for clarity
        return jsonify({
            "prediction": prediction_int,
            "label": prediction_label
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500