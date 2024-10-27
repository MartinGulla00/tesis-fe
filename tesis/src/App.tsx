import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createQuery } from "./api/model";
import SchemaUpload from "./SchemaUpload";

export const App = () => {
  const [query, setQuery] = useState("");
  const [databaseSchemaFile, setDatabaseSchemaFile] = useState<File | null>(null); 
  const [resultSqlQuery, setResultSqlQuery] = useState("");
  const [modelToUse, setModelToUse] = useState<"gpt" | "vertex">("gpt");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultSqlQuery);
    setIsCopied(true);

    // Revert the state after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const { mutate: gptMutation, isPending: isApiPending } = useMutation({
    mutationFn: createQuery.mutation,
    onSuccess: (data) => {
      setResultSqlQuery(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (databaseSchemaFile) {
      gptMutation({ userInput: query, model: modelToUse, sqlFile: databaseSchemaFile });
    } else {
      alert("Please upload a valid SQL schema file.");
    }
  };

  return (
    <div className="h-screen w-screen bg-orange-50 flex flex-col items-center">
      <h1 className="text-4xl text-center pt-10">Test Natural Language to SQL</h1>
      <form className="flex flex-col gap-2 justify-center pt-10 w-1/4 items-center" onSubmit={handleSubmit}>
        <div>
          <SchemaUpload onDatabaseSchemaChange={setDatabaseSchemaFile} />
        </div>
        <input
          className="border-2 border-gray-300 bg-white px-5 pr-16 rounded-lg text-sm focus:outline-gray-500 h-10 w-full"
          placeholder="Type a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            disabled={!databaseSchemaFile || !query}
            onClick={() => setModelToUse("gpt")}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg w-fit disabled:bg-orange-200 disabled:cursor-not-allowed"
          >
            Use GPT
          </button>
          <button
            disabled={!databaseSchemaFile || !query}
            onClick={() => setModelToUse("vertex")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-fit disabled:bg-blue-200 disabled:cursor-not-allowed"
          >
            Use Vertex
          </button>
        </div>
      </form>
      <div className="flex flex-col gap-2 justify-center pt-10 w-1/4 items-center">
        <h2 className="text-2xl">SQL Query</h2>
        {isApiPending && <p className="text-lg text-gray-500">Loading...</p>}
        {!isApiPending && resultSqlQuery ? (
          <>
            <textarea
              className="border-2 border-gray-300 px-5 pr-16 rounded-lg text-sm focus:outline-gray-500 w-full h-80 font-mono bg-gray-800 text-white resize-none"
              value={resultSqlQuery}
              readOnly
            />
            <button
              type="button"
              className={`${
                isCopied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-lg w-fit transition-colors duration-300`}
              onClick={handleCopy}
            >
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-500">No SQL query generated yet</p>
        )}
      </div>
    </div>
  );
};
