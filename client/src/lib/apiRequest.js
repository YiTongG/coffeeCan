import axios from "axios";
//base url
const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,  // allowed cookie
});
export default apiRequest;