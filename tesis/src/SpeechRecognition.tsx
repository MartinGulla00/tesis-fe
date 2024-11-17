import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

interface VoiceInputProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ query, setQuery }) => {
  const [isListening, setIsListening] = useState<boolean>(false);

  if (recognition) {
    recognition.lang = "es-ES";
  }

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
        console.error("Speech recognition error: ", event.error);
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
    <div className="flex items-start space-x-3">
      <textarea
        className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none h-24"
        placeholder="Habla o escribe tu consulta en lenguaje natural..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className={`flex items-center justify-center w-12 h-12 rounded-full text-white focus:outline-none shadow-md transition ${
          isListening ? "bg-red-500 animate-pulse" : "bg-indigo-500 hover:bg-indigo-600"
        }`}
        onClick={isListening ? stopListening : startListening}
      >
        <FaMicrophone className="text-lg" />
      </button>
    </div>
  );
};

export default VoiceInput;
