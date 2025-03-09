'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import VoiceChat with no SSR and explicit error handling
const VoiceChat = dynamic(
  () => import('../src/components/VoiceChat').then(mod => {
    console.log('VoiceChat loaded:', mod); // Debug loading
    return mod.default;
  }).catch(err => {
    console.error('Error loading VoiceChat:', err);
    throw err;
  }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 animate-pulse flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading voice interface...</span>
        </div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <main className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Argo AI Assistant
          </h1>
          
          <p className="text-xl text-gray-600">
            Your voice-enabled AI companion. Click the microphone to start chatting.
          </p>

          <Suspense fallback={
            <div className="w-full h-96 rounded-xl bg-gray-50 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">Loading...</div>
            </div>
          }>
            <div className="w-full rounded-xl shadow-lg bg-white p-6 mt-8">
              <VoiceChat />
            </div>
          </Suspense>

          <footer className="text-sm text-gray-500 mt-12 flex flex-col items-center gap-2">
            <div>Version 1.0.5 - Debug Build</div>
            <div className="text-xs">Build: {new Date().toISOString()}</div>
          </footer>
        </main>
      </div>
    </div>
  );
}
