'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export default function VoiceChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastTranscriptRef = useRef<string>('');
  const isMountedRef = useRef(true);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    speechSynthesisRef.current = window.speechSynthesis;
    
    return () => {
      isMountedRef.current = false;
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const handleTranscript = useCallback(async (text: string) => {
    if (!isMountedRef.current) return;
    lastTranscriptRef.current = text;
  }, []);

  const handleRecordingStop = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    const finalTranscript = lastTranscriptRef.current.trim();
    if (!finalTranscript || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      setMessages(prev => [...prev, { role: 'user', content: finalTranscript }]);
      
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalTranscript }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.response) {
        throw new Error('No response from AI');
      }

      if (isMountedRef.current) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        
        if (speechSynthesisRef.current) {
          const utterance = new SpeechSynthesisUtterance(data.response);
          speechSynthesisRef.current.speak(utterance);
        }
      }
    } catch (err) {
      console.error('Error querying Claude:', err);
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to get AI response');
      }
    } finally {
      if (isMountedRef.current) {
        setIsProcessing(false);
        lastTranscriptRef.current = '';
      }
    }
  }, [isProcessing]);

  const { isListening, transcript, toggleListening, setTranscript } = useSpeechRecognition({
    onTranscript: handleTranscript,
    onError: (error) => {
      if (isMountedRef.current) {
        setError(error);
        setIsInitialized(false);
      }
    },
    onStop: handleRecordingStop
  });

  const handleToggleListening = useCallback(async () => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
    await toggleListening();
  }, [isInitialized, toggleListening]);

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
        {isProcessing && (
          <div className="text-gray-500 text-center">
            Processing your message...
          </div>
        )}
      </div>
      
      <button
        onClick={handleToggleListening}
        disabled={isProcessing}
        className={`p-4 rounded-full ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
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