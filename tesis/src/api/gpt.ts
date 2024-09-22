import axios from "axios";

export const createGPTQuery = {
    mutation: async ({
      schema,
      query,
    }:{ schema: string, query: string}) => {
      const { data } = await axios.post<
        { schema: string, query: string},
        { data: { sqlQuery: string } }
      >(`${import.meta.env.VITE_GPT_API}/query`, {
        schema,
        query,
      });
  
      return data.sqlQuery;
    },
  };