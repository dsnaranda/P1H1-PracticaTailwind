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

const getProductos = async () => {
    try {
        const database = await getConenection(); // Asegúrate de que esta función se conecta a tu base de datos
        const productos = await database.collection("productos").find().toArray(); // Recupera todos los documentos de la colección
        return productos; // Retorna toda la información de cada producto
    } catch (error) {
        console.error("Error al obtener los productos:", error);
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


const updateStock = async (products) => {
    try {
        const database = await getConenection();
        const results = await Promise.all(products.map(async (product) => {
            const { nombre, cantidad } = product; // Desestructura nombre y cantidad del producto
            const currentProduct = await database.collection("productos").findOne({ nombre });
            if (!currentProduct) {
                return false; 
            }
            if (currentProduct.cantidad < cantidad) {
                return false; 
            }
            // Actualiza el stock
            const result = await database.collection("productos").updateOne(
                { nombre },
                { $inc: { cantidad: -cantidad } }
            );

            return result.modifiedCount > 0; // Devuelve verdadero si se actualizó correctamente
        }));

        // Retorna verdadero solo si todos los productos se actualizaron correctamente
        return results.every(result => result);
    } catch (error) {
        console.error("Error al actualizar el stock:", error);
        throw error; // Propaga el error
    }
};



export { getUsuarios, loginUsuario , getProductos, updateStock };


