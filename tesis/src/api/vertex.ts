import axios from "axios";

export const createQuery = {
    mutation: async ({
      schema,
      query,
    }:{ schema: string, query: string}) => {
      const { sqlQuery } = await axios.post<
        { schema: string, query: string},
        { sqlQuery: string }
      >(`http://192.168.1.13:8001/transform-query`, {
        schema,
        query,
      });
  
      return sqlQuery;
    },
  };