import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa'; 

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const VoiceInput: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onspeechend = () => {
        setIsListening(false);
        recognition.stop();
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error: ', event.error);
        setIsListening(false);
      };
    } else {
      console.error("Speech Recognition is not supported in this browser.");
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        className="border-2 border-gray-300 bg-white px-5 pr-10 rounded-lg text-sm focus:outline-gray-500 h-10 w-full"
        placeholder="Type a question or speak..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    
      <button
        className={`bg-blue-500 text-white rounded-lg p-2 h-10 w-10 flex justify-center items-center focus:outline-none ${isListening ? 'bg-red-500' : ''}`}
        onClick={isListening ? stopListening : startListening}
      >
        <FaMicrophone />
      </button>
    </div>
  );
};

export default VoiceInput;
