import os
from email import policy
from email.parser import BytesParser
import PyPDF2

def extract_email_body(file_path):
    

    _, ext = os.path.splitext(file_path)
    ext = ext.lower()

    try:
        if ext == '.eml':
            with open(file_path, 'rb') as f:
                msg = BytesParser(policy=policy.default).parse(f)
            # Prefer plain text; fallback to HTML stripped
            if msg.is_multipart():
                for part in msg.walk():
                    content_type = part.get_content_type()
                    if content_type == 'text/plain':
                        return part.get_content()
                # If no plain text found, fallback to first text/html
                for part in msg.walk():
                    if part.get_content_type() == 'text/html':
                        return part.get_content()
            else:
                return msg.get_content()

        elif ext == '.pdf':
            with open(file_path, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                text = ''
                for page in reader.pages:
                    text += page.extract_text() or ''
            return text

        else:
            print("Unsupported file type. Please provide a .eml or .pdf file.")
            return None

    except Exception as e:
        print(f"Error while processing file: {e}")
        return None
