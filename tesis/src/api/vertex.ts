import axios from "axios";

export const createQuery = {
    mutation: async ({
      schema,
      query,
    }:{ schema: string, query: string}) => {
      const { data } = await axios.post<
        { schema: string, query: string},
        { data: { sqlQuery: string } }
      >(`http://localhost:8001/transform-query`, {
        schema,
        query,
      });
  
      return data.sqlQuery;
    },
  };