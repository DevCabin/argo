# ARGO - AI Assistant

A modern AI assistant with natural language processing, Google Sheets integration, and web search capabilities.

## Deployment Guide

### Prerequisites
- A GitHub account
- A Vercel account
- OpenAI API key
- Google Cloud credentials
- Google Sheets ID

### Deployment Steps


1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/argo.git
   cd argo
   ```

2. **Set up Vercel**
   - Go to [Vercel](https://vercel.com)
   - Create a new project
   - Import your GitHub repository
   - Select the root directory as the project root

3. **Configure Environment Variables**
   In your Vercel project settings, add these environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_APPLICATION_CREDENTIALS=your_google_credentials_json
   GOOGLE_SHEET_ID=your_google_sheet_id
   ```

4. **Deploy**
   - Vercel will automatically detect the project structure
   - Click "Deploy"
   - Wait for the build to complete

5. **Verify Deployment**
   - Check the deployment logs for any errors
   - Test the chat interface
   - Verify Google Sheets integration

### Troubleshooting

If you encounter issues:

1. **Build Failures**
   - Check the build logs in Vercel
   - Verify all environment variables are set
   - Ensure all dependencies are properly listed

2. **API Errors**
   - Verify API keys are correct
   - Check CORS settings
   - Ensure proper API permissions

3. **Google Sheets Issues**
   - Verify Google Cloud credentials
   - Check sheet permissions
   - Ensure sheet ID is correct

### Local Development (Optional)

If you want to develop locally:

1. **Frontend**
   ```bash
   cd client
   npm install
   npm start
   ```

2. **Backend**
   ```bash
   cd server
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```

### Project Structure
```
argo/
├── client/             # React frontend
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── server/            # Python backend
│   ├── app.py        # Main application
│   └── requirements.txt # Backend dependencies
└── vercel.json       # Vercel configuration
```

## Features
- Natural language chat interface
- OpenAI GPT integration
- Google Sheets knowledge base
- Web search capabilities
- Modern, responsive UI
- Cross-platform compatibility

## Roadmap
- V2: Natural speech interface
- V2: Google Calendar integration
- V3: Mobile app development
- V3: Enhanced AI capabilities

## License
MIT