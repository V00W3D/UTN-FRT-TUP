import {login} from '../services/authService.js';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {ADMIN} from '../routers/HomePage.routes.js';

export const useAuth = () => {
    // Recuperar usuario del localStorage al iniciar
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const res = await login(credentials);
            const userData = res.find(item => item.email === credentials.email && 
                item.password === credentials.password);

           if(!userData){
            throw new Error("Credenciales invalidas");
           }

            // Guardar usuario en el estado y localStorage
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            navigate(ADMIN);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return { user, error, handleLogin, handleLogout };
};