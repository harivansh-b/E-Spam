from flask import Flask
from flask_cors import CORS
from .config import Config
from .predict_route import bp

def create_app():
    app = Flask(
        __name__,
        static_folder='static',
        static_url_path='/static'
    )
    app.config.from_object(Config)
    CORS(
        app,
        supports_credentials=True,
        resources={r"/api/*": {"origins": "https://e-spam.vercel.app"}}
    )
    app.register_blueprint(bp, url_prefix='/api')
    return app
