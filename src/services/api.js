import axios from "axios";

export const BASE_URL = "https://mattress-backend-2.onrender.com";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default api;
