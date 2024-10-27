// src/app.js
import express from "express";
import { getUsuarios, loginUsuario, getProductos, updateStock } from "./dbMongo.mjs"; // Asegúrate de que la ruta es correcta
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use(cors());
app.use(express.json()); // Para manejar JSON

// Ruta para obtener usuarios
app.get("/api/usuarios", async (req, res) => {
    try {
        const usuarios = await getUsuarios();
        res.status(200).json(usuarios); // Envía todos los datos en formato JSON
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

app.get("/api/productos", async (req, res) => {
    try {
        const productos = await getProductos(); // Llama a la función que obtiene los productos
        res.status(200).json(productos); // Envía todos los datos en formato JSON
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" }); // Responde con un error si ocurre
    }
});


app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Body recibido:", req.body);
    try {
        const user = await loginUsuario(email, password);
        if (user) {
            res.status(200).json({ message: "Login exitoso", user });
        } else {
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en el login", detalle: error.message }); // Incluir detalles del error
    }
});

app.post("/api/updateStock", async (req, res) => {
    const products = req.body.products; // Cambia a obtener el arreglo de productos
    if (!Array.isArray(products)) {
        return res.status(400).json({ error: "Se esperaba un arreglo de productos" });
    }

    try {
        const updated = await updateStock(products); // Pasa el arreglo de productos a la función
        if (updated) {
            res.status(200).json({ message: "Stock actualizado correctamente" });
        } else {
            res.status(404).json({ error: "Uno o más productos no se encontraron o stock insuficiente" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el stock", detalle: error.message });
    }
});



// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});