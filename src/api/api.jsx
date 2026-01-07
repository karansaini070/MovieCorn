import axios from "axios";

const api = axios.create({
  baseURL: "https://mailapi.prashantsaini.in/call/3",
});

export default api;
