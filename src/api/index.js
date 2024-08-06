import axios from "axios";

export const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`,
  },
});

export default api;
