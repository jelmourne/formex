import axios from "axios";

const api = axios.create({
  baseURL: "http://10.2.200.204/api",
  headers: {
    post: {
      "Access-Control-Allow-Origin": true,
    },
    patch: {
      "Access-Control-Allow-Origin": true,
    },
  },
});

export default api;
