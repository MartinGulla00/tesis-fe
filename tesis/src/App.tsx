import React, { useState } from "react";
import { useMutation } from "react-query";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createQuery } from "./api/model";
import SchemaUpload from "./SchemaUpload";
import VoiceInput from "./SpeechRecognition";
import Recommendations from "./SimilarPrompt";
import OpenAI from "openai";
import { getUserId } from "@/utils/tokenStorage";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const generateEmbeddingWithBackoff = async (text: string, attempt = 1): Promise<number[]> => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    if (error.status === 429 && attempt <= 3) {
      const delay = Math.pow(2, attempt) * 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return generateEmbeddingWithBackoff(text, attempt + 1);
    }
    console.error("Error generating embedding:", error);
    return [];
  }
};

export const App = () => {
  const [query, setQuery] = useState<string>(""); 
  const [databaseSchemaFile, setDatabaseSchemaFile] = useState<File | null>(null);
  const [resultSqlQuery, setResultSqlQuery] = useState("");
  const [modelToUse, setModelToUse] = useState<"gpt" | "vertex">("gpt"); 
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promptEmbedding, setPromptEmbedding] = useState<number[]>([]);
  const [recommendation, setRecommendation] = useState<{ id: number; question: string; similarity: number } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultSqlQuery);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const { mutate: gptMutation, isLoading: isApiPending } = useMutation({
    mutationFn: createQuery.mutation,
    onSuccess: (data) => {
      setResultSqlQuery(data);
    },
  });

  const handleSubmit = async () => {
    const embedding = await generateEmbeddingWithBackoff(query);
    if (embedding.length > 0) {
      setPromptEmbedding(embedding);

      const { data, error } = await supabase.rpc('match_reports', {
        query_embedding: embedding,
        match_threshold: 0,
        match_count: 1,
        requester_user_id: getUserId()
      });

      if (error) {
        console.error("Error fetching recommendations:", error);
        return;
      }

      if (data && data.length > 0) {
        setRecommendation(data[0]);
        setShowModal(true);
      } else {
        gptMutation({ userInput: query, model: modelToUse, sqlFile: databaseSchemaFile });
      }
    }
  };

  const handleAskThis = (prompt: string) => {
    setQuery(prompt);
    setShowModal(false);
  };

  const handleClose = () => {
    setRecommendation(null);
    setShowModal(false);
    gptMutation({ userInput: query, model: modelToUse, sqlFile: databaseSchemaFile });
  };

  return (
    <div className="h-screen w-screen bg-orange-50 flex flex-col items-center">
      <h1 className="text-4xl text-center pt-10 mb-8">Test Natural Language to SQL</h1> 
  
      <div className="mb-6">
        <SchemaUpload onDatabaseSchemaChange={setDatabaseSchemaFile} />
      </div>
  
      <div className="mb-6 w-full max-w-md">
        <VoiceInput query={query} setQuery={setQuery} />
      </div>
  
      <div className="flex gap-2 mt-4">
        <button
          disabled={!databaseSchemaFile || !query}
          onClick={() => {
            setModelToUse("gpt");
            handleSubmit();
          }}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-orange-200 disabled:cursor-not-allowed"
        >
          Use GPT
        </button>
        <button
          disabled={!databaseSchemaFile || !query}
          onClick={() => {
            setModelToUse("vertex");
            handleSubmit();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-blue-200 disabled:cursor-not-allowed"
        >
          Use Vertex
        </button>
      </div>
  
      {isApiPending && <p className="text-lg text-gray-500">Loading...</p>}
  
      {resultSqlQuery && (
        <div className="flex flex-col items-center mt-4 w-1/4">
          <textarea
            className="border-2 border-gray-300 px-5 pr-16 rounded-lg text-sm focus:outline-gray-500 w-full h-80 font-mono bg-gray-800 text-white resize-none"
            value={resultSqlQuery}
            readOnly
          />
          <button
            type="button"
            className={`${isCopied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded-lg w-fit transition-colors duration-300 mt-2`}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      )}
  
      {showModal && recommendation && (
        <div className="modal bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <Recommendations 
            promptEmbedding={promptEmbedding} 
            recommendation={recommendation} 
            onAskThis={handleAskThis} 
            onClose={handleClose} 
          />
        </div>
      )}
    </div>
  );
};
