
import axios from "axios";
import { readData, storeData } from "./localStorage";



export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// al recibir el token en la respuesta, guardarlo
apiClient.interceptors.response.use(
  async (response: any) => {
    console.log(response);
    
    // si trae el token en la respuesta, conservarlo
    if (response.auth_token) {
      await storeData("accessToken", response.auth_token)
    }
    return response;
  },
  async (error) => {
    console.log(error);
    // si hay mecanismo de refrescar token, realizar el proceso si
    // el token actual ha caducado
    // ver ejemplo en: https://medium.com/@aqeel_ahmad/handling-jwt-access-token-refresh-token-using-axios-in-react-react-native-app-2024-f452c96a83fc
    /*
    const originalRequest = error.config;
    if (error.response.status === 401) {
      // refrescar el token
    }
      */
    return Promise.reject(error);
  }
);


// en cada petición
// agregar el token si está guardado
apiClient.interceptors.request.use(
  async config => {
    // leer token del storage
    const accessToken = await readData("accessToken");
    console.log("Access token value: ", accessToken);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

