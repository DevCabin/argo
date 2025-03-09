'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

// Dynamically import VoiceChat with no SSR to avoid window undefined issues
const VoiceChat = dynamic(
  () => import('../src/components/VoiceChat').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
        Loading voice chat...
      </div>
    ),
  }
);

function ErrorFallback() {
  return (
    <div className="w-full h-96 bg-red-50 rounded-lg p-4 flex items-center justify-center text-red-600">
      Error loading voice chat. Please refresh the page.
    </div>
  );
}

// Force new build with timestamp
const BUILD_TIME = new Date().toISOString();

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
        <Suspense fallback={
          <div className="w-full h-96 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            Loading voice interface...
          </div>
        }>
          <ErrorBoundary fallback={<ErrorFallback />}>
            <VoiceChat />
          </ErrorBoundary>
        </Suspense>
        <footer className="text-sm text-gray-500 mt-8 flex flex-col items-center gap-2">
          <div>Version 1.0.3 (Clean Build)</div>
          <div className="text-blue-500">Build Time: {BUILD_TIME}</div>
        </footer>
      </main>
    </div>
  );
}
