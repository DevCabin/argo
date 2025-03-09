import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionProps {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
}

export function useSpeechRecognition({ onTranscript, onError }: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (!SpeechRecognition) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        onTranscript?.(transcriptText);
      };

      recognition.onerror = (event: any) => {
        onError?.(`Recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        }
      };

      recognitionRef.current = recognition;
      
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    } catch (err) {
      onError?.('Failed to initialize speech recognition');
    }
  }, [isListening, onTranscript, onError]);

  const toggleListening = useCallback(async () => {
    try {
      if (!recognitionRef.current) {
        onError?.('Speech recognition not initialized');
        return;
      }

      if (!isListening) {
        await recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    } catch (err) {
      onError?.('Failed to toggle speech recognition');
    }
  }, [isListening, onError]);

  return {
    isListening,
    transcript,
    toggleListening,
    setTranscript
  };
} 