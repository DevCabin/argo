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
  const initializationRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const initializeRecognition = useCallback(async () => {
    if (initializationRef.current) {
      return initializationRef.current;
    }

    initializationRef.current = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Speech recognition is not available in this environment'));
        return;
      }

      try {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!SpeechRecognition) {
          throw new Error('Speech recognition is not supported in this browser');
        }

        const recognition = new SpeechRecognition();
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
          
          // Use requestAnimationFrame for smoother updates
          requestAnimationFrame(() => {
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
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    return initializationRef.current;
  }, [onTranscript, onError, onStop]);

  const toggleListening = useCallback(async () => {
    if (!isMountedRef.current) return;

    try {
      await initializeRecognition();
      
      if (!recognitionRef.current) {
        throw new Error('Speech recognition not initialized');
      }

      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error toggling speech recognition:', error);
      onError?.(error instanceof Error ? error.message : 'Failed to toggle speech recognition');
    }
  }, [isListening, initializeRecognition, onError]);

  return {
    isListening,
    transcript,
    toggleListening,
    setTranscript
  };
} 