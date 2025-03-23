# Chat Application

This repository contains the code for a chat application with LLM, Google Sheets, and web search integration, designed for deployment on Vercel.

## Project Structure

- `client/`: Contains the React frontend.
- `server/`: Contains the Python Flask backend.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd chat-app
    ```

2.  **Frontend Setup:**

    ```bash
    cd client
    npm install
    cd ..
    ```

3.  **Backend Setup:**

    ```bash
    cd server
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt # create requirements.txt first (see below)
    deactivate
    cd ..
    ```

4.  **Environment Variables:**

    -   Create a `.env` file in the `server/` directory and add your API keys and Google Sheets credentials.
    -   Example `.env` content:

        ```
        OPENAI_API_KEY=your_openai_api_key
        GOOGLE_SHEET_ID=your_google_sheet_id
        GOOGLE_APPLICATION_CREDENTIALS=path/to/your/google_credentials.json
        ```

5.  **Running the Application:**

    -   **Frontend:**

        ```bash
        cd client
        npm start
        ```

    -   **Backend:**

        ```bash
        cd server
        source venv/bin/activate
        python app.py
        deactivate
        ```

    -   You will need to have two terminal windows open to run both the client and server.

## Vercel Deployment

1.  **Install Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

2.  **Deploy the Frontend:**

    -   Navigate to the `client/` directory and run:

        ```bash
        vercel
        ```

    -   Follow the prompts to deploy the frontend.

3.  **Deploy the Backend:**

    -   Navigate to the `server/` directory.

    -   Create a `requirements.txt` file:

        ```bash
        source venv/bin/activate
        pip freeze > requirements.txt
        deactivate
        ```

    -   Run:

        ```bash
        vercel --prod
        ```

    -   Follow the prompts to deploy the backend. Make sure to add the environment variables in the Vercel project settings.

## Roadmap

-   **Phase 1: Core Functionality (MVP)**
    -   Text-based chat interface with access to LLM and Google Sheets knowledge.
    -   Basic web search integration.
    -   Conversation history stored in Google Sheets.
-   **Phase 2: Enhanced Routing & Knowledge Base**
    -   More intelligent routing of user requests.
    -   Improved knowledge base search.
    -   Better error handling.
-   **Phase 3: Speech Integration and Cross-Platform**
    -   Microphone input for speech.
    -   Cross-platform mobile apps.
    -   Database for storing and analyzing past conversations.

## Contributing

Feel free to contribute to this project by submitting pull requests.

## License

[MIT](LICENSE)