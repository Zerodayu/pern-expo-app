import axios from "axios";

const api = axios.create({
  baseURL: "https://pern-3591.onrender.com/api/products",
  headers: {
    'X-App-Type': 'mobile-app',
    'User-Agent': 'PERN-Mobile-App/1.0',
  },
});

export default api;