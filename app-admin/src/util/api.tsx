import axios from "axios";
import config from "./config";

const apiInstance = axios.create({
  baseURL: config.api_URL,
  headers: { id: config.api_key },
});



export default apiInstance;
