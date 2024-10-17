import axios from "axios";

export const createQuery = {
  mutation: async ({
    sqlFile,
    model, 
    userInput, 
  }: {
    sqlFile: File;
    model: string;
    userInput: string;
  }) => {
    const formData = new FormData();

    formData.append("sqlFile", sqlFile);
    formData.append("model", model);
    formData.append("userInput", userInput);

    try {
      const { data } = await axios.post<
        FormData,
        { data: { sqlString: string } }
      >(`${import.meta.env.BASE_SERVER_API}/chat`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.sqlString;
    } catch (error) {
      console.error("Error uploading SQL file:", error);
      throw error;
    }
  },
};
