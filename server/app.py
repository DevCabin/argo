from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai
import os
import logging
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    logger.error("OpenAI API key not found in environment variables")
    raise ValueError("OpenAI API key is required")

# Configure Google Sheets
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
SPREADSHEET_ID = os.getenv('GOOGLE_SHEET_ID')

def get_sheets_service():
    try:
        if not SERVICE_ACCOUNT_FILE or not os.path.exists(SERVICE_ACCOUNT_FILE):
            logger.warning("Google Sheets credentials not found or invalid")
            return None
            
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        service = build('sheets', 'v4', credentials=credentials)
        return service
    except Exception as e:
        logger.error(f"Error initializing Google Sheets service: {str(e)}")
        return None

def append_to_sheet(service, data):
    try:
        if not service or not SPREADSHEET_ID:
            logger.warning("Google Sheets not configured")
            return False
            
        sheet = service.spreadsheets()
        body = {
            'values': [[
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                data.get('user_message', ''),
                data.get('assistant_response', '')
            ]]
        }
        result = sheet.values().append(
            spreadsheetId=SPREADSHEET_ID,
            range='Sheet1!A:C',
            valueInputOption='RAW',
            body=body
        ).execute()
        logger.info(f"Appended to sheet: {result}")
        return True
    except Exception as e:
        logger.error(f"Error appending to sheet: {str(e)}")
        return False

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        user_message = data.get('message', '')
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Get OpenAI response
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are ARGO, a helpful and friendly AI assistant."},
                    {"role": "user", "content": user_message}
                ]
            )
            assistant_response = response.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            return jsonify({'error': 'Failed to get AI response'}), 500

        # Append to Google Sheets if configured
        sheets_service = get_sheets_service()
        if sheets_service:
            append_to_sheet(sheets_service, {
                'user_message': user_message,
                'assistant_response': assistant_response
            })

        return jsonify({
            'response': assistant_response,
            'status': 'success'
        })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'An unexpected error occurred',
            'status': 'error'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        # Check OpenAI API key
        if not openai.api_key:
            return jsonify({
                'status': 'unhealthy',
                'error': 'OpenAI API key not configured'
            }), 500
            
        # Check Google Sheets configuration
        if not SERVICE_ACCOUNT_FILE or not SPREADSHEET_ID:
            return jsonify({
                'status': 'degraded',
                'message': 'Google Sheets not configured'
            }), 200
            
        return jsonify({
            'status': 'healthy',
            'message': 'All services operational'
        })
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
