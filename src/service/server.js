// src/app.js
import express from "express";
import { getUsuarios, loginUsuario } from "./dbMongo.mjs"; // Asegúrate de que la ruta es correcta
import cors from "cors";

const app = express();
const PORT = 3000;

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



// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

