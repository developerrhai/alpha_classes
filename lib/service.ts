import axios from "axios";

const api = axios.create({
  baseURL: "https://institute-api.rhaitech.online/alphaclasses/api", // backend url
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;