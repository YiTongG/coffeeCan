import axios from "axios";
//base url
const apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,  //using cookie
});

export default apiRequest;