import axios from 'axios';
import { useSpinnerStore } from '@/stores/spinner'; // Importa el store de Pinia para el spinner
import router from '@/router'; // Importa el router de Vue

// Crear una instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.API_URL, // Usar la URL de la API desde el archivo .env
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(response => {

  const spinnerStore = useSpinnerStore(); // Obtener el store del spinner
  spinnerStore.hideSpinner(); // Ocultar el spinner al recibir la respuesta

  return response;
}, error => {
  const spinnerStore = useSpinnerStore(); // Obtener el store del spinner
  spinnerStore.hideSpinner(); // Ocultar el spinner si hay un error
  
  if (error.response && error.response.status === 401) {
    router.push('/'); 
  }
  return Promise.reject(error);
});

export default api;