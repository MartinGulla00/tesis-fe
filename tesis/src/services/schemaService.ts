import axios from "axios";

export const schemaService = {
  fetchSchemas: async (userId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/schemas?user_id=${userId}`
      );
      return response.data.schemas || [];
    } catch (error) {
      console.error("Error fetching schemas:", error);
      throw error;
    }
  },
};
