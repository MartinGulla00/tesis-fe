import React from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

interface SimilarPromptProps {
  promptEmbedding?: number[];
  recommendation: { id: number; question: string; similarity: number };
  onAskThis: (prompt: string) => void;
  onClose: () => void;
}

const SimilarPrompt: React.FC<SimilarPromptProps> = ({ recommendation, onAskThis, onClose }) => {
  return (
    <div>
      <h2>You previously asked:</h2>
      <div className="mb-4">
        <p>{recommendation.question || "No prompt available"}</p>
        <div className="flex gap-2 mt-2">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg"
            onClick={() => onAskThis(recommendation.question)}
          >
            Ask this
          </button>
          <button 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarPrompt;
