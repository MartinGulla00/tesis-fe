import React, { useState } from "react";
import { useMutation } from "react-query";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createQuery } from "./api/model";
import { schemaService } from "./services/schemaService";
import SchemaUpload from "./SchemaUpload";
import VoiceInput from "./SpeechRecognition";
import SimilarPrompt from "./SimilarPrompt";
import OpenAI from "openai";
import { getUserId } from "@/utils/tokenStorage";
import Heading1 from "@/components/headings/Heading1";
import { Button } from "@/components/ui/button";
import SchemaSelectionModal from "@/components/SchemaSelectionModal";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const generateEmbeddingWithBackoff = async (text, attempt = 1) => {
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
    return [];
  }
};

export const App = () => {
  const [query, setQuery] = useState("");
  const [databaseSchemaFile, setDatabaseSchemaFile] = useState<File | null>(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [schemas, setSchemas] = useState([]);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [resultSqlQuery, setResultSqlQuery] = useState("");
  const [modelToUse, setModelToUse] = useState<"gpt" | "vertex">("gpt");
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promptEmbedding, setPromptEmbedding] = useState<number[]>([]);
  const [recommendation, setRecommendation] = useState(null);
  const [saveSchemaFlag, setSaveSchemaFlag] = useState(false);
  const [saveSchemaName, setSaveSchemaName] = useState("");

  const [loading, setLoading] = useState(false); // New loading state

  const fetchSchemas = useMutation({
    mutationFn: async () => {
      const userId = getUserId();
      return schemaService.fetchSchemas(userId);
    },
    onMutate: () => setLoading(true), // Start loading when mutation is initiated
    onSuccess: (data) => {
      setSchemas(data);
      setShowSchemaModal(true);
      setLoading(false); // Stop loading when mutation succeeds
    },
    onError: (error) => {
      console.error("Error fetching schemas:", error);
      setLoading(false); // Stop loading when mutation fails
    },
  });

  const gptMutation = useMutation<string, Error, {
    userInput: string;
    model: "gpt" | "vertex";
    sqlFile: File | null;
    saveSchemaFlag: boolean;
    saveSchemaName: string;
  }>({
    mutationFn: (variables) => createQuery.mutation(variables),
    onMutate: () => setLoading(true), // Start loading when mutation is initiated
    onSuccess: (data) => {
      setResultSqlQuery(data);
      setLoading(false); // Stop loading when mutation succeeds
    },
    onError: (error) => {
      console.error("Error generating SQL query:", error);
      setLoading(false); // Stop loading when mutation fails
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(resultSqlQuery);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSubmit = async () => {
    const embedding = await generateEmbeddingWithBackoff(query);
    if (embedding.length > 0) {
      setPromptEmbedding(embedding);

      const { data, error } = await supabase.rpc("match_reports", {
        query_embedding: embedding,
        match_threshold: 0.7,
        match_count: 1,
        requester_user_id: getUserId(),
      });

      if (error) {
        console.error("Error fetching recommendations:", error);
        return;
      }

      if (data && data.length > 0) {
        setRecommendation(data[0]);
        setShowModal(true);
      } else {
        const sqlFile = selectedSchema
          ? new File([selectedSchema.schema], selectedSchema.filename, { type: "text/plain" })
          : databaseSchemaFile;

        gptMutation.mutate({
          userInput: query,
          model: modelToUse,
          sqlFile,
          saveSchemaFlag,
          saveSchemaName,
        });
      }
    }
  };

  const handleAskThis = (prompt: string) => {
    setQuery(prompt);
    setShowModal(false);

    const sqlFile = selectedSchema
      ? new File([selectedSchema.schema], selectedSchema.filename, { type: "text/plain" })
      : databaseSchemaFile;

    gptMutation.mutate({
      userInput: prompt,
      model: modelToUse,
      sqlFile,
      saveSchemaFlag,
      saveSchemaName,
    });
  };

  const handleSchemaSelection = (schema) => {
    setSelectedSchema(schema);
    setSaveSchemaName(schema.filename);
    setShowSchemaModal(false);
  };

  const handleClose = () => {
    setRecommendation(null);
    setShowModal(false);

    const sqlFile = selectedSchema
      ? new File([selectedSchema.schema], selectedSchema.filename, { type: "text/plain" })
      : databaseSchemaFile;

    gptMutation.mutate({
      userInput: query,
      model: modelToUse,
      sqlFile,
      saveSchemaFlag,
      saveSchemaName,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6 border border-gray-200">
        <div className="text-center">
          <Heading1 text="Generador de SQL Natural" />
          <p className="text-gray-500 mt-2">Convierte tus preguntas en consultas SQL con IA.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">1. Selecciona o carga un esquema</h2>
          <div className="flex items-center gap-4">
            <SchemaUpload
              onDatabaseSchemaChange={(file) => {
                setDatabaseSchemaFile(file);
                setSelectedSchema(null);
                setSaveSchemaName("");
              }}
            />
            <Button
              onClick={() => fetchSchemas.mutate()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Elegir Esquema
            </Button>
          </div>
          {selectedSchema || databaseSchemaFile ? (
            <p className="text-sm text-green-600 mt-2">
              Esquema cargado: {selectedSchema ? selectedSchema.filename : databaseSchemaFile?.name}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No hay un esquema cargado. Usa uno por defecto si lo prefieres.</p>
          )}
        </div>

        {loading && (
          <div className="text-center text-blue-500 mt-4">
            <p>Procesando...</p>
          </div>
        )}

        {databaseSchemaFile && (
          <div className="mt-4">
            <input
              type="checkbox"
              className="form-checkbox text-indigo-600"
              checked={saveSchemaFlag}
              onChange={(e) => setSaveSchemaFlag(e.target.checked)}
            />
            <label className="ml-2 text-sm text-gray-700">¿Guardar esquema?</label>
          </div>
        )}
        {saveSchemaFlag && (
          <input
            type="text"
            value={saveSchemaName}
            onChange={(e) => setSaveSchemaName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-gray-700 mt-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Escribe un nombre para el esquema"
          />
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">2. Escribe o dicta tu consulta</h2>
          <VoiceInput query={query} setQuery={setQuery} />
        </div>

        <div className="flex space-x-4 mt-6">
          <Button
            onClick={() => {
              setModelToUse("gpt");
              handleSubmit();
            }}
            disabled={!query.trim()}
            className={`bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md ${
              !query.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Usar GPT
          </Button>
          <Button
            onClick={() => {
              setModelToUse("vertex");
              handleSubmit();
            }}
            disabled={!query.trim()}
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ${
              !query.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Usar Vertex
          </Button>
        </div>

        {resultSqlQuery && (
          <div className="mt-6">
            <textarea
              readOnly
              value={resultSqlQuery}
              className="w-full border border-gray-300 rounded-md p-4 bg-gray-50 text-gray-700"
            />
            <Button
              onClick={handleCopy}
              className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md"
            >
              {isCopied ? "¡Copiado!" : "Copiar al portapapeles"}
            </Button>
          </div>
        )}
      </div>

      {showSchemaModal && (
        <SchemaSelectionModal
          schemas={schemas}
          onSelect={handleSchemaSelection}
          onClose={() => setShowSchemaModal(false)}
        />
      )}

      {showModal && recommendation && (
        <div className="modal bg-gray-800 text-white p-6 rounded-md shadow-lg">
          <SimilarPrompt
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
