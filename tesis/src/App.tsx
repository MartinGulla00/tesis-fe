import { useState } from "react"
import { Modal } from "./Modal"
import { useMutation } from "@tanstack/react-query"
import { createVertexQuery } from "./api/vertex"
import { createGPTQuery } from "./api/gpt"

export const App = () => {
  const [query, setQuery] = useState('')
  const [databaseSchema, setDatabaseSchema] = useState('')
  const [showSchemaInput, setShowSchemaInput] = useState(false)
  const [resultSqlQuery, setResultSqlQuery] = useState('')
  const [modelToUse, setModelToUse] = useState<'gpt'|'vertex'>('gpt')
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultSqlQuery);
    setIsCopied(true);

    // Revert the state after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const { mutate: vertexMutation, isPending: isVertexPending } = useMutation({
    mutationFn: createVertexQuery.mutation,
    onSuccess: (data) => {
      setResultSqlQuery(data)
    }
  });
  const { mutate: gptMutation, isPending: isGptPending } = useMutation({
    mutationFn: createGPTQuery.mutation,
    onSuccess: (data) => {
      setResultSqlQuery(data)
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (modelToUse === 'gpt') {
      gptMutation({ query, schema: databaseSchema })
      return
    }
    if (modelToUse === 'vertex')
      vertexMutation({ query, schema: databaseSchema })
  }

  return (
    <div className="h-screen w-screen bg-orange-50 flex flex-col items-center">
      <h1 className="text-4xl text-center pt-10">Test Natural Language to SQL</h1>
      <Modal isOpen={showSchemaInput} onClose={() => setShowSchemaInput(false)}>
        <div className="flex flex-col gap-2 h-full w-[800px]">
          <textarea
            className="border-2 border-gray-300 bg-white px-5 pr-16 rounded-lg text-sm focus:outline-gray-500 w-full h-full resize-none"
            placeholder="Enter the database schema..."
            value={databaseSchema}
            onChange={(e) => setDatabaseSchema(e.target.value)}
          />
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-fit" onClick={() => setShowSchemaInput(false)}>
            Save Schema
          </button>
        </div>
      </Modal>
      <form className="flex flex-col gap-2 justify-center pt-10 w-1/4 items-center" onSubmit={handleSubmit}>
        <button
          type="button"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg w-fit"
          onClick={() => {
            setShowSchemaInput(true)
          }}
        >
          Enter Database Schema
        </button>
        <input
          className="border-2 border-gray-300 bg-white px-5 pr-16 rounded-lg text-sm focus:outline-gray-500 h-10 w-full"
          placeholder="Type a question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            disabled={!databaseSchema || !query}
            onClick={() => setModelToUse('gpt')}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg w-fit disabled:bg-orange-200 disabled:cursor-not-allowed"
          >
            Use GPT
          </button>
          <button
            disabled={!databaseSchema || !query}
            onClick={() => setModelToUse('vertex')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-fit disabled:bg-blue-200 disabled:cursor-not-allowed"
          >
            Use Vertex
          </button>
        </div>
      </form>
        <div className="flex flex-col gap-2 justify-center pt-10 w-1/4 items-center">
          <h2 className="text-2xl">SQL Query</h2>
          {(isGptPending || isVertexPending) && <p className="text-lg text-gray-500">Loading...</p>}
          {!(isGptPending || isVertexPending) && resultSqlQuery ? (
            <>
              <textarea
                className="border-2 border-gray-300 px-5 pr-16 rounded-lg text-sm focus:outline-gray-500 w-full h-80 font-mono bg-gray-800 text-white resize-none"
                value={resultSqlQuery}
                readOnly
              />
              <button type="button" className={`${
                isCopied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded-lg w-fit transition-colors duration-300`} onClick={handleCopy}>
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </>
          ) : (
            <p className="text-lg text-gray-500">No SQL query generated yet</p>
          )}
      </div>
    </div>
  )
}
