import React, { createContext, useContext, useReducer } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { apiClient } from "../../../config/apiClient";


interface ContextDefinition {
    loading: boolean;
    user: any;
    message: string;

    login: (email: string, password: string) => void;
    logout: () => void;
}

const SessionContext = createContext({} as ContextDefinition);

interface SessionState {
    loading: boolean;
    user: any;
    message: string;
}

// Definir las acciones
type SessionActionType = 
    { type: "Set Loading", payload: boolean } |
    { type: "Set user", payload: any } |
    { type: "Set message", payload: string };

// Valores iniciales
const initialState: SessionState = {
    loading: false,
    user: null,
    message: "",
};

// Reducer: manipula el estado y retorna un nuevo estado
function sessionReducer(state: SessionState, action: SessionActionType): SessionState {
    switch (action.type) {
        case "Set Loading":
            return {
                ...state,
                loading: action.payload,
            };
        case "Set user":
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case "Set message":
            return {
                ...state,
                message: action.payload,
            };
        default:
            return state;
    }
}

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(sessionReducer, initialState);
	const navigate = useNavigation()

    const login = async (email: string, password: string) => {
        dispatch({ type: "Set Loading", payload: true });
    
        try {
            // Llamada a la API para iniciar sesión
            const response = await apiClient.post("/api/auth/login", { email, password });
            
            // Suponiendo que el token o los datos de usuario se devuelven en response.data
            const user = response.data;
    
            dispatch({ type: "Set user", payload: user });
            dispatch({ type: "Set message", payload: "Inicio de sesión exitoso" });
            navigate.navigate('Home');
        } catch (error: any) {
            dispatch({ type: "Set Loading", payload: false });
            dispatch({ type: "Set message", payload: error.response?.data?.message || "Error al iniciar sesión" });
        }
    };

    const logout = async () => {
        try {
           /*  await signOut(auth); */
			navigate.navigate('Login')
            dispatch({ type: "Set user", payload: null });
            dispatch({ type: "Set message", payload: "Sesión cerrada correctamente" });
        } catch (error: any) {
            dispatch({ type: "Set message", payload: error.message || "Error al cerrar sesión" });
        } 
    };

    return (
        <SessionContext.Provider value={{ ...state, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

// Hook para consumir el estado de sesión
function useSessionState() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSessionState debe ser usado dentro de un SessionProvider");
    }
    return context;
}

export { SessionProvider, useSessionState };
