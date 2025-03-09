import { useState, useEffect } from 'react';

export default function VoiceChat() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      // Store recognition instance in window to prevent recreation
      window.recognitionInstance = recognition;
    }
  }, [isListening]);

  const toggleListening = async () => {
    if (!isListening) {
      try {
        await window.recognitionInstance.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    } else {
      window.recognitionInstance.stop();
      setIsListening(false);
      
      if (transcript.trim()) {
        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: transcript }]);
        
        // Send to Claude API
        try {
          const response = await fetch('/api/claude', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: transcript }),
          });
          
          const data = await response.json();
          
          // Add Claude's response
          setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
          
          // Speak the response
          const utterance = new SpeechSynthesisUtterance(data.response);
          window.speechSynthesis.speak(utterance);
        } catch (error) {
          console.error('Error querying Claude:', error);
        }
        
        setTranscript('');
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <div className="w-full h-96 bg-gray-50 rounded-lg p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-100 ml-auto max-w-[80%]'
                : 'bg-gray-100 mr-auto max-w-[80%]'
            }`}
          >
            {message.content}
          </div>
        ))}
        {transcript && (
          <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[80%] italic">
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