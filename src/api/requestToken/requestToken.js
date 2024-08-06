import api, { API_KEY } from "..";
import validateKey from "../validateKey/validateKey";

const getRequestToken = async () => {
  try {
    const isValid = await validateKey();
    if (isValid) {
      const response = await api.get(
        `/authentication/token/new?api_key=${API_KEY}`
      );
      const token = response.data.request_token;
      return token;
    } else {
      throw new Error("API key validation failed");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getRequestToken;
