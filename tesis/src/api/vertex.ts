import axios from "axios";

export const createQuery = {
    mutation: async ({
      schema,
      query,
    }:{ schema: string, query: string}) => {
        console.log("A")
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