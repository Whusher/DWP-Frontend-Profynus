import axios from "axios";

// const BASE_API_URL_USER = "http://localhost:5000"; //LOCAL ENVIRONMENT
const BASE_API_URL_USER = "https://profynus-backend.vercel.app"; //PRODUCTION ENVIRONMENT
// URLs de la API

// Obtener token de localStorage
const getAuthToken = () => localStorage.getItem("accessToken");

// Crear la instancia de axios
export const api = axios.create({
    baseURL: BASE_API_URL_USER,
    headers: {
        "Content-Type": "application/json"
    }
});

// Interceptor de solicitudes
api.interceptors.request.use(
    async (config) => {
        const token = getAuthToken();

        // console.log("ENTERING interceptor");

        if (token) {
            // Aquí agregamos el token al encabezado de autorización
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log("No token found, proceeding without Authorization header.");
        }

        // console.log("Returning interceptor configuration");
        return config;
    },
    error => {
        console.log("Error in interceptor", error);
        return Promise.reject(error);
    }
);

// Interceptor de respuestas para manejar errores 401 (token expirado)
api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Token expiro, intentar refrescar el token
            console.log("Token expired, attempting to refresh");

            const newToken = await refreshAuthToken();

            // Actualizar el token en el encabezado y volver a hacer la solicitud
            if (newToken) {
                error.config.headers['Authorization'] = `Bearer ${newToken}`;
                return axios(error.config); // Reintentar la solicitud original con el nuevo token
            }
        }
        return Promise.reject(error);
    }
);

// Lógica para refrescar el token
export const refreshAuthToken = async () => {
    try {
        // Send a request to refresh the token without manually including the refresh token
        const response = await axios.post(`${BASE_API_URL_USER}/auth/refresh-token`,{}, {
            withCredentials: true // Make sure cookies are sent with the request
        });
        if (response.data.accessToken) {
            // If we get a new access token, store it in localStorage
            console.log("\n\nSUCCESS WITH REFRESH")
            //SET ALL CREDENTIALS
            localStorage.setItem("accessToken", response.data.accessToken);
            return response.data.accessToken;
        } else {
            // If no token is returned, redirect to login
            // window.location.href = "/login";
            console.log('Returning /login FROM NOT ACCESS TOKEN')
            return null;
        }
    } catch (error) {
        console.log("Error refreshing token", error);
        // If there's an error, redirect to login
        // window.location.href = "/login";
        console.log('Returning /login from ERROR')
        return null;
    }
};

export const verifyToken = async () => {
    try{
        // Send a request to refresh the token without manually including the refresh token
        const response = await axios.get(`${BASE_API_URL_USER}/auth/verify-token`, {
            withCredentials: true // Make sure cookies are sent with the request
        });
        if(response.data.username){
            localStorage.setItem('username',response.data.username )
            localStorage.setItem('email',response.data.email)
            localStorage.setItem('firstName',response.data.firstName)
            localStorage.setItem('user', JSON.stringify(response.data))
            // console.log('GOOD VERIFICATION')
            return true;
        }else{
            console.log(response.data);
            console.log('SOMETHING WRONG')
            throw new Error('Invalid token response');
        }
    }catch(error){
        console.log('ERROR INT THE REQUEST',error)
        throw error; // Lanza el error para que pueda ser capturado en `verifyAuth
    }
}