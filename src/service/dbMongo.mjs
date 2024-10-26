import { getConenection } from "./dbConex.js"; 

const getUsuarios = async () => {
    try {
        const database = await getConenection();
        const usuarios = await database.collection("usuarios").find().toArray(); // Recupera todos los documentos de la colección
        return usuarios; // Retorna toda la información de cada usuario
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error; // Lanza el error para ser capturado en la ruta
    }
};

const loginUsuario = async (email, password) => {
    try {
        const database = await getConenection();
        console.log("Conexión establecida con la base de datos"); // Confirmar conexión
        const user = await database.collection("usuarios").findOne({ email, password });
        console.log("Resultado de búsqueda de usuario:", user); // Verificar el resultado
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error en loginUsuario:", error);
        throw error; // Propagar el error
    }
};


export { getUsuarios, loginUsuario};


