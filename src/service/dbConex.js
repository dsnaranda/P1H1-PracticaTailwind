import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "url de mongo usuario:contraseña";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      // Conectar el cliente al servidor
      await client.connect();
      // Enviar un ping para confirmar una conexión exitosa
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  
      // Listar las bases de datos disponibles
      const databasesList = await client.db().admin().listDatabases();
      console.log("Bases de datos disponibles:");
      databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`); // Imprimir el nombre de cada base de datos
      });
    } catch (error) {
      console.error("Error al conectar a MongoDB:", error);
    } finally {
      // Asegurarse de que el cliente se cierre al finalizar/error
      await client.close();
    }
  }
  
  const getConenection = async () => {
    try {
        await client.connect(); // Asegúrate de usar `await` aquí
        console.log("Conexión a MongoDB establecida");
        return client; // Retorna el cliente en lugar de la base de datos
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
    }
};

export { getConenection, run };
