import axios from "axios";

export const createVertexQuery = {
    mutation: async ({
      schema,
      query,
    }:{ schema: string, query: string}) => {
      const { data } = await axios.post<
        { schema: string, query: string},
        { data: { sqlQuery: string } }
      >(`${import.meta.env.VITE_VERTEX_API}/transform-query`, {
        schema,
        query,
      });
  
      return data.sqlQuery;
    },
  };