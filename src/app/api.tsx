import axios from "axios";

export const mainAxios = axios.create({
  baseURL: "http://localhost:8000",
});
