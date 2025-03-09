# Argo - Voice AI Application

A voice-controlled web application that enables interaction with AI and data through speech. The application uses Mozilla DeepSpeech for speech recognition, DeepSeek for AI processing, and Google Sheets as a database.

## Flow
TTS -> LLM AI -> DB -> LLM AI -> TTS

1. Voice input is converted to text using Mozilla DeepSpeech
2. Text is processed by DeepSeek AI
3. Data is stored/retrieved from Google Sheets
4. AI generates response using DeepSeek
5. Response is converted back to speech using Web Speech API

## Project Roadmap

- [ ] Initialize Next.js project ✅
- [ ] Set up Mozilla DeepSpeech in `/api/transcribe`
- [ ] Configure DeepSeek local instance
- [ ] Implement Google Sheets API connection
- [ ] Create voice command parser:
  - [ ] Write commands: "Add [item]" → Sheets append
  - [ ] Read commands: "Show [filter]" → Sheets query
- [ ] Build UI with voice controls:
  - [ ] Record button
  - [ ] Real-time transcription display
- [ ] Add error handling for:
  - [ ] Speech recognition failures
  - [ ] Sheet API rate limits
- [ ] Implement voice feedback system
- [ ] Set up Vercel deployment config
- [ ] Add environment variables for:
  - [ ] Google Sheets credentials
  - [ ] DeepSeek API key
- [ ] Create demo video/docs

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
DEEPSEEK_API_KEY=
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- [Mozilla DeepSpeech Documentation](https://github.com/mozilla/DeepSpeech)
- [DeepSeek Documentation](https://github.com/deepseek-ai/DeepSeek-LLM)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
