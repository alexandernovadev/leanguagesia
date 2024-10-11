import express, { Request, Response } from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import { generateText } from "./app/services/generateText";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
// const mongoURI =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/tu_base_de_datos";

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("Conectado a MongoDB"))
//   .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  const prompt = "Paises de america";

  generateText(prompt)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).send("Error: " + error.message);
    });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
