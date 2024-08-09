import axios from "axios";

export const ACCOUNT_ID = process.env.REACT_APP_ACCOUNT_ID;
export const API_KEY = process.env.REACT_APP_API_KEY;
export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_AUTH}`,
  },
});

export default api;
