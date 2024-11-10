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
    console.error("Error generating embedding:", error);
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

  const { mutate: fetchSchemas } = useMutation(
    async () => {
      const userId = getUserId();
      return await schemaService.fetchSchemas(userId);
    },
    {
      onSuccess: (data) => {
        setSchemas(data);
        setShowSchemaModal(true);
      },
      onError: (error) => console.error("Error fetching schemas:", error),
    }
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(resultSqlQuery);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const { mutate: gptMutation, isLoading: isApiPending } = useMutation<string, Error, {
    userInput: string;
    model: "gpt" | "vertex";
    sqlFile: File | null;
    saveSchemaFlag: boolean;
    saveSchemaName: string;
  }>({
    mutationFn: (variables) => createQuery.mutation(variables),
    onSuccess: (data) => {
      setResultSqlQuery(data);
    },
  });

  const handleSaveSchemaToggle = (checked: boolean) => {
    setSaveSchemaFlag(checked);
    if (!checked) {
      setSaveSchemaName("");
    }
  };

  const handleSubmit = async () => {
    const embedding = await generateEmbeddingWithBackoff(query);
    if (embedding.length > 0) {
      setPromptEmbedding(embedding);

      const { data, error } = await supabase.rpc("match_reports", {
        query_embedding: embedding,
        match_threshold: 0,
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

        gptMutation({
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

    gptMutation({
      userInput: query,
      model: modelToUse,
      sqlFile,
      saveSchemaFlag,
      saveSchemaName,
    });
  };

  const handleClose = () => {
    setRecommendation(null);
    setShowModal(false);

    const sqlFile = selectedSchema
      ? new File([selectedSchema.schema], selectedSchema.filename, { type: "text/plain" })
      : databaseSchemaFile;

    gptMutation({
      userInput: query,
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

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <Heading1 text="Generador de SQL Natural" />
        </div>
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <VoiceInput query={query} setQuery={setQuery} />

          <div className="space-y-2">
            <div className="mt-2 flex items-center space-x-2">
              <SchemaUpload onDatabaseSchemaChange={(file) => {
                setDatabaseSchemaFile(file);
                setSelectedSchema(null);
                setSaveSchemaName("");
              }} />
              <Button onClick={() => fetchSchemas()} className="bg-gray-300">
                Elegir Esquema
              </Button>
            </div>

            {selectedSchema || databaseSchemaFile ? (
              <p className="text-xs text-blue-500 mt-2">
                Esquema cargado: {selectedSchema ? selectedSchema.filename : databaseSchemaFile?.name}
              </p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">Puedes omitir el esquema para usar uno por defecto.</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={saveSchemaFlag}
              onChange={(e) => handleSaveSchemaToggle(e.target.checked)}
              className="form-checkbox text-indigo-600"
            />
            <span className="text-sm text-gray-700">¿Guardar esquema?</span>
          </div>

          {saveSchemaFlag && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="schemaName">
                Nombre del Esquema (Opcional)
              </label>
              <input
                type="text"
                id="schemaName"
                value={saveSchemaName}
                onChange={(e) => setSaveSchemaName(e.target.value)}
                className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ingrese el nombre del esquema"
                disabled={selectedSchema !== null}
              />
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              onClick={() => {
                setModelToUse("gpt");
                handleSubmit();
              }}
              disabled={!query}
              className="bg-indigo-600 hover:bg-indigo-800 text-white"
            >
              Usar GPT
            </Button>
            <Button
              onClick={() => {
                setModelToUse("vertex");
                handleSubmit();
              }}
              disabled={!query}
              className="bg-blue-600 hover:bg-blue-800 text-white"
            >
              Usar Vertex
            </Button>
          </div>

          {isApiPending && <p className="text-center text-gray-500 mt-4">Procesando...</p>}

          {resultSqlQuery && (
            <div className="mt-4">
              <textarea
                className="w-full h-40 border rounded-md p-2 bg-gray-50 text-sm font-mono"
                value={resultSqlQuery}
                readOnly
              />
              <Button
                onClick={handleCopy}
                className="mt-2 w-full bg-green-500 hover:bg-green-700 text-white"
              >
                {isCopied ? "¡Copiado!" : "Copiar al portapapeles"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {showSchemaModal && (
        <SchemaSelectionModal
          schemas={schemas}
          onSelect={handleSchemaSelection}
          onClose={() => setShowSchemaModal(false)}
        />
      )}

      {showModal && recommendation && (
        <div className="modal bg-gray-800 text-white p-4 rounded-lg shadow-lg">
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
