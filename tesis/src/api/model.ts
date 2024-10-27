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

    console.log('Model:', model);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/schema/chat`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log('Response data:', response.data);

      let sqlString = response.data.sqlString;
      if (typeof sqlString === 'object') {
        sqlString = JSON.stringify(sqlString, null, 2);
      }

      return sqlString;
    } catch (error) {
      console.error("Error uploading SQL file:", error);
      throw error;
    }
  },
};