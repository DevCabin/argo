# Argo - Voice AI Application

A voice-controlled web application that enables interaction with AI and data through speech. The application uses Mozilla DeepSpeech for speech recognition, Claude AI for natural language processing, and Google Sheets as a database.

## Features

- Voice-to-text transcription
- Natural language processing with Claude AI
- Text-to-speech responses
- Real-time chat interface
- Modern, responsive design

## Browser Compatibility

For the best experience, please use a modern browser that supports the Web Speech API:
- Chrome (recommended)
- Edge
- Safari
- Firefox

## Flow
TTS -> Claude AI -> DB -> Claude AI -> TTS

1. Voice input is converted to text using Mozilla DeepSpeech
2. Text is processed by Claude AI
3. Data is stored/retrieved from Google Sheets
4. AI generates response using Claude
5. Response is converted back to speech using Web Speech API

## Project Roadmap

- [x] Initialize Next.js project
- [ ] Set up Mozilla DeepSpeech in `/api/transcribe`
- [x] Configure AI Integration:
  - [x] Set up Claude API client
  - [ ] Implement command parsing
  - [ ] Add response generation
- [ ] Implement Google Sheets API connection
- [ ] Create voice command parser:
  - [ ] Write commands: "Add [item]" → Sheets append
  - [ ] Read commands: "Show [filter]" → Sheets query
- [ ] Build UI with voice controls:
  - [ ] Record button
  - [ ] Real-time transcription display
  - [ ] Voice feedback indicator
- [ ] Add error handling for:
  - [ ] Speech recognition failures
  - [ ] API rate limits
  - [ ] Network issues
- [ ] Implement voice feedback system
- [ ] Set up Vercel deployment config
- [ ] Add environment variables for:
  - [ ] Google Sheets credentials
  - [ ] Claude API key
- [ ] Create demo video/docs
- [ ] Add voice-controlled app settings:
  - [ ] Store settings in database
  - [ ] Voice commands to modify app behavior
  - [ ] Persistent settings across sessions
  - [ ] Real-time app updates based on settings

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_SPREADSHEET_ID=
CLAUDE_API_KEY=
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- [Mozilla DeepSpeech Documentation](https://github.com/mozilla/DeepSpeech)
- [Claude AI Documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Todo

- [ ] Add voice-controlled app settings
- [ ] Implement conversation history
- [ ] Add voice profile customization
