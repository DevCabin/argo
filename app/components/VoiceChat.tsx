'use client';

import { useState, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VoiceChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTranscript = useCallback(async (text: string) => {
    if (text.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: text }]);
      
      try {
        const response = await fetch('/api/claude', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: text }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        
        const utterance = new SpeechSynthesisUtterance(data.response);
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('Error querying Claude:', err);
        setError('Failed to get AI response');
      }
    }
  }, []);

  const { isListening, transcript, toggleListening, setTranscript } = useSpeechRecognition({
    onTranscript: handleTranscript,
    onError: setError
  });

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <div className="w-full h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg text-gray-800 ${
              message.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
        {transcript && (
          <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[80%] italic text-gray-800">
            {transcript}
          </div>
        )}
      </div>
      
      <button
        onClick={toggleListening}
        className={`p-4 rounded-full ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors w-16 h-16 flex items-center justify-center`}
        aria-label={isListening ? 'Stop recording' : 'Start recording'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isListening
                ? 'M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z'
                : 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
            }
          />
        </svg>
      </button>
    </div>
  );
} 