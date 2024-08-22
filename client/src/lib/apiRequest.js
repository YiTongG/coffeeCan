import axios from "axios";
//base url
const apiRequest = axios.create({
  
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,  //using cookie
});

export default apiRequest;