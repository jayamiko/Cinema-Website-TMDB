import api, { API_KEY } from "..";

const validateKey = async () => {
  try {
    const response = await api.get(`/authentication?api_key=${API_KEY}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default validateKey;
