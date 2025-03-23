from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
from google.oauth2 import service_account
from googleapiclient.discovery import build
import json
from datetime import datetime

load_dotenv()
app = Flask(__name__)
CORS(app)

# Initialize OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Initialize Google Sheets
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
credentials = service_account.Credentials.from_service_account_info(
    json.loads(os.getenv('GOOGLE_APPLICATION_CREDENTIALS')),
    scopes=SCOPES
)
sheets_service = build('sheets', 'v4', credentials=credentials)
SPREADSHEET_ID = os.getenv('GOOGLE_SHEET_ID')

def route_query(message):
    """Route the query to appropriate handler based on content"""
    # Simple routing logic - can be enhanced with more sophisticated NLP
    if any(word in message.lower() for word in ['search', 'find', 'look up']):
        return 'web_search'
    elif any(word in message.lower() for word in ['sheet', 'database', 'record']):
        return 'sheets'
    else:
        return 'llm'

def append_to_sheets(message, response):
    """Append conversation to Google Sheets"""
    try:
        values = [[message, response, str(datetime.now())]]
        body = {'values': values}
        sheets_service.spreadsheets().values().append(
            spreadsheetId=SPREADSHEET_ID,
            range='Sheet1!A:C',
            valueInputOption='RAW',
            body=body
        ).execute()
    except Exception as e:
        print(f"Error appending to sheets: {e}")

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    
    try:
        # Route the query
        route = route_query(message)
        
        if route == 'llm':
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": message}],
                max_tokens=150
            )
            response_text = response.choices[0].message.content.strip()
        elif route == 'sheets':
            # Query Google Sheets for relevant information
            # This is a placeholder - implement actual sheets query logic
            response_text = "Retrieved from sheets database"
        else:  # web_search
            # Implement web search logic here
            response_text = "Web search results"
        
        # Append conversation to sheets
        append_to_sheets(message, response_text)
        
        return jsonify({'response': response_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
