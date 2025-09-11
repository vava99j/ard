// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { SerialPort } from "serialport";

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 Conexão MySQL
const pool = mysql.createPool({
  host: "seu_host_mysql",
  user: "seu_usuario",
  password: "sua_senha",
  database: "seu_banco",
});

// 🔌 Conexão Arduino (porta varia no seu PC)
const port = new SerialPort({ path: "COM3", baudRate: 9600 });

// Rota para listar plantas
app.get("/plantas", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM plantas");
  res.json(rows);
});

// Rota para mandar comando pro Arduino
app.post("/arduino", (req, res) => {
  const { comando } = req.body;
  if (!comando) return res.status(400).json({ erro: "Comando obrigatório" });

  port.write(comando + "\n", (err) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ status: "Comando enviado", comando });
    console.log(comando)
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000 🚀"));