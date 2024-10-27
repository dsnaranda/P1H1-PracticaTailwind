import { MongoClient } from "mongodb";

//Cambios para MongoAtlas
const getConenection = async () => {
    try {
        const mongoUrl = "mongodb://localhost:27017/T1H1DataBase_Tienda";
        const client = await MongoClient.connect(mongoUrl);
        console.log("Conexión a MongoDB establecida");
        return client.db();
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

export { getConenection };