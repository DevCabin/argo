'use client';

import dynamic from 'next/dynamic';

// Dynamically import VoiceChat with no SSR to avoid window undefined issues
const VoiceChat = dynamic(() => import('../src/components/VoiceChat'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold">
          Argo - Voice AI Assistant
        </h1>
        <p className="text-xl mb-8">
          Click the microphone button to start chatting
        </p>
        <VoiceChat />
      </main>
    </div>
  );
}
