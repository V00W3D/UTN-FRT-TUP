import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    // Función para obtener el valor inicial del localStorage
    const getStoredValue = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key '${key}':`, error);
            return initialValue;
        }
    };

    // Estado para almacenar nuestro valor
    const [value, setValue] = useState(getStoredValue);

    // useEffect para actualizar localStorage cuando el valor cambie
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    }, [key, value]); // Dependencias: la clave y el valor

    return [value, setValue];
}

export default useLocalStorage;