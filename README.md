# E-Mail Spam Detection System

A full-stack web application that uses machine learning to detect spam messages in E-Mail text and email files. Built with Next.js for the frontend, Python Flask for the backend, and a Multinomial Naive Bayes model for classification.

## 🌟 Features

- **Real-time E-Mail Spam Detection**: Classify messages as spam or legitimate (ham)
- **Email File Upload**: Support for PDF and EML file uploads with text extraction
- **Machine Learning Model**: Uses Multinomial Naive Bayes with CountVectorizer
- **Modern Web Interface**: Clean, responsive UI built with Next.js
- **High Accuracy**: Achieves 98.93% accuracy on test data
- **REST API**: Backend API for model predictions and file processing
- **Data Preprocessing**: Handles duplicate removal and text vectorization
- **Live Demo**: Deployed frontend available at https://e-spam.vercel.app/

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework for production
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Fetch** - HTTP client for API calls
- **Deployed on Vercel** - https://e-spam.vercel.app/

### Backend
- **Python 3.8+** - Programming language
- **Flask** - Web framework for API
- **scikit-learn** - Machine learning library
- **pandas** - Data manipulation
- **pickle** - Model serialization
- **File Processing** - PDF and EML text extraction

### Machine Learning
- **Multinomial Naive Bayes** - Classification algorithm
- **CountVectorizer** - Text feature extraction
- **sklearn** - Machine learning toolkit

## 📊 Model Performance

- **Algorithm**: Multinomial Naive Bayes
- **Accuracy**: 98.93% on test set
- **Dataset**: E-Mail Spam Collection Dataset
- **Features**: Bag of Words with English stop words removal
- **Train/Test Split**: 80/20

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/E-Mail-spam-detection.git
   cd E-Mail-spam-detection
   ```

2. **Set up the machine learning model**
   ```bash
   # Install Python dependencies
   pip install pandas scikit-learn flask flask-cors pickle5
   
   # Run the Jupyter notebook to train the model (optional - pre-trained models included)
   jupyter notebook model.ipynb
   ```

3. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

4. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000 (or https://e-spam.vercel.app/ for live demo)
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
e-spam/
├─ app/
│  ├─ (root)/
│  │  ├─ explore/
│  │  │  └─ page.js
│  │  ├─ home/
│  │  │  └─ page.js
│  │  ├─ layout.js
│  │  └─ page.js
│  ├─ favicon.ico
│  ├─ globals.css
│  └─ layout.js
├─ backend/
│  ├─ app/
│  │  ├─ models/
│  │  │  ├─ count_vectorizer.pkl
│  │  │  ├─ model.ipynb
│  │  │  ├─ spam_classifier_model.pkl
│  │  │  └─ spam.csv
│  │  ├─ uploads/
│  │  ├─ __init__.py
│  │  ├─ config.py
│  │  ├─ predict_route.py
│  │  └─ utils.py
│  ├─ requirements.txt
│  └─ run.py
├─ components/
│  ├─ ui/
│  │  ├─ button.jsx
│  │  ├─ card.jsx
│  │  ├─ label.jsx
│  │  └─ textarea.jsx
│  ├─ FileUpload.jsx
│  ├─ Header.jsx
│  ├─ Hero.jsx
│  ├─ HowToInput.jsx
│  ├─ InputArea.jsx
│  └─ Predict.jsx
├─ lib/
│  └─ utils.js
├─ public/
│  ├─ eml.png
│  ├─ espam.jpg
│  ├─ logo.png
│  └─ pdf.png
├─ .gitignore
├─ components.json
├─ eslint.config.mjs
├─ jsconfig.json
├─ next-env.d.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tailwind.config.js
└─ tsconfig.json

```

## 🔧 API Endpoints

### POST /api/predict
Predict if a message is spam or not.

**Request Body:**
```json
{
  "text": "Congratulations! You've won a lottery!"
}
```

**Response:**
```json
{
  "prediction": 1,
  "label": "Spam"
}
```

**Response Values:**
- `prediction`: Integer (0 for "Not spam", 1 for "Spam")
- `label`: String ("Not spam" or "Spam")

### POST /api/upload
Upload and analyze email files (PDF or EML format).

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: File upload with key "file"

**Supported File Types:**
- `.pdf` - PDF documents
- `.eml` - Email message files

**Response (Success):**
```json
{
  "message": "Extracted email content text...",
  "status": "success"
}
```

**Response (Error):**
```json
{
  "error": "Error description"
}
```

**Error Cases:**
- No file in request: 400
- No file selected: 400
- Unsupported file type: 400
- Text extraction failed: 400
- Server error: 500

## 🧠 Model Details

### Data Preprocessing
1. **Dataset Loading**: E-Mail Spam Collection dataset with 5,572 messages
2. **Duplicate Removal**: Reduced to 5,157 unique messages
3. **Label Encoding**: 'ham' → 'Not spam', 'spam' → 'Spam'
4. **Text Vectorization**: CountVectorizer with English stop words removal

### Training Process
1. **Train/Test Split**: 80% training, 20% testing
2. **Feature Extraction**: Bag of Words representation
3. **Model Training**: Multinomial Naive Bayes classifier
4. **Model Evaluation**: Achieved 98.93% accuracy

### Model Files
- `spam_classifier_model.pkl`: Trained Multinomial Naive Bayes model
- `count_vectorizer.pkl`: Fitted CountVectorizer for text preprocessing

## 🎯 Usage Examples

### Web Interface
1. **Live Demo**: Visit https://e-spam.vercel.app/
2. **Text Analysis**: Enter an E-Mail message in the text area and click "Check Message"
3. **File Upload**: Upload PDF or EML files for automatic text extraction and analysis
4. **Results**: View predictions showing whether the content is spam or legitimate

### API Usage

#### Text Prediction
```bash
# Using curl
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Free entry in 2 a wkly comp to win FA Cup final"}'

# Using Python requests
import requests

response = requests.post(
    'http://localhost:5000/api/predict',
    json={'text': 'Your message here'}
)
print(response.json())
```

#### File Upload
```bash
# Using curl
curl -X POST http://localhost:5000/api/upload \
  -F "file=@/path/to/your/email.eml"

# Using Python requests
import requests

with open('email.pdf', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:5000/api/upload', files=files)
    print(response.json())
```

## 📈 Model Performance Metrics

| Metric | Value |
|--------|-------|
| Accuracy | 98.93% |
| Dataset Size | 5,157 messages |
| Training Set | 4,125 messages |
| Test Set | 1,032 messages |
| Features | Bag of Words (CountVectorizer) |
