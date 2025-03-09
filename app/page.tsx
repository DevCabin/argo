'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import VoiceChat with no SSR
const VoiceChat = dynamic(() => import('../src/components/VoiceChat'), {
  ssr: false,
  loading: () => <div className="animate-pulse w-full h-96 bg-gray-100 rounded-lg"></div>
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

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

          <div className="w-full rounded-xl shadow-lg bg-white p-6 mt-8">
            <VoiceChat onLoad={() => setIsLoaded(true)} />
          </div>

          <footer className="text-sm text-gray-500 mt-12 flex flex-col items-center gap-2">
            <div>Version 1.0.4</div>
            <div className="text-xs">Build: {new Date().toISOString()}</div>
            {!isLoaded && (
              <div className="text-blue-500 animate-pulse">
                Loading voice interface...
              </div>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
}
