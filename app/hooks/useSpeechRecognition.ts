import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionProps {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
  onStop?: () => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export function useSpeechRecognition({
  onTranscript,
  onError,
  onStop
}: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('webkitSpeechRecognition' in window)) {
      onError?.('Speech recognition is not supported in this browser');
      return;
    }

    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      if (isMountedRef.current) {
        setIsListening(true);
        setTranscript('');
      }
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (!isMountedRef.current) return;
      
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      
      // Batch state updates
      Promise.resolve().then(() => {
        if (isMountedRef.current) {
          setTranscript(transcript);
          onTranscript?.(transcript);
        }
      });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (!isMountedRef.current) return;
      
      console.error('Speech recognition error:', event.error);
      onError?.(event.error);
    };

    recognition.onend = () => {
      if (isMountedRef.current) {
        setIsListening(false);
        onStop?.();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onError, onStop]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current || !isMountedRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  }, [isListening]);

  return {
    isListening,
    transcript,
    toggleListening,
    setTranscript
  };
} 