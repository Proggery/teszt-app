import axios from "axios";

const apiClient = () => {
  const { REACT_APP_API_URL } = process.env;
  
  const createAxios = axios.create({
    baseURL: REACT_APP_API_URL,
    responseType: "json",
  });

  return createAxios;
};

export default apiClient;
