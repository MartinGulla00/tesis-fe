import axios from "axios";

export const createQuery = {
  mutation: async ({
    sqlFile,
    model,
    userInput,
    saveSchemaFlag,
    saveSchemaName,
  }: {
    sqlFile: File | null;
    model: string;
    userInput: string;
    saveSchemaFlag: boolean;
    saveSchemaName: string;
  }) => {
    const formData = new FormData();
    if (sqlFile) {
      formData.append("sqlFile", sqlFile);
    }
    formData.append("model", model);
    formData.append("userInput", userInput);
    formData.append("saveSchemaFlag", saveSchemaFlag.toString());
    formData.append("saveSchemaName", saveSchemaName);

    console.log("Model:", model);
    console.log("SaveSchemaFlag:", saveSchemaFlag);
    console.log("SaveSchemaName:", saveSchemaName);

    try {
      console.log("Uploading SQL file...");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_API}/api/schema/chat`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);

      let sqlString = response.data.sqlString;
      if (typeof sqlString === "object") {
        sqlString = JSON.stringify(sqlString, null, 2);
      }

      return sqlString;
    } catch (error) {
      console.error("Error uploading SQL file:", error);
      throw error;
    }
  },
};
