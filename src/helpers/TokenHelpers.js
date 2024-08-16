import { jwtDecode } from "jwt-decode";


const validateToken = () => {
    try {
        // Decodificar el token
        const token = localStorage.getItem('token')

        const decodedToken = jwtDecode(token);

        // Obtener el tiempo de expiración del token (en segundos)
        const expirationTime = decodedToken.exp * 1000; // Convertir a milisegundos

        // Verificar si el token ha expirado
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
            // Token ha expirado, eliminar del localStorage y lanzar un error
            localStorage.removeItem('token');
            throw new Error('La sesión ha expirado por favor inicia sesión nuevamente');
        }

        // Token es válido
        return token;

    } catch (err) {
        console.error(err.message);
        return null;
    }
};

export { validateToken };

