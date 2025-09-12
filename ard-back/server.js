import express from "express";
import cors from "cors";
import { SerialPort } from "serialport";

// 🔹 Troque para "arduino" quando quiser usar placa real
const MODO = "simulado"; // "simulado" ou "arduino"

const app = express();
app.use(cors());
app.use(express.json());

let sensorValue = 0;
let port;

// 🚀 Configurações dependendo do modo
if (MODO === "arduino") {
  port = new SerialPort({ path: "COM5", baudRate: 9600 });

  // Lendo dados do Arduino
  port.on("data", (data) => {
    sensorValue = parseInt(data.toString()) || 0;
    console.log("🔌 Valor vindo do Arduino:", sensorValue);
  });
} else {
  // Simulação (gera valores a cada 2 segundos)
  setInterval(() => {
    sensorValue = Math.floor(Math.random() * 100);
    console.log("🤖 Valor simulado:", sensorValue);
  }, 2000);
}

// 📌 Endpoint para o app pegar o valor do sensor
app.get("/sensor", (req, res) => {
  res.json({ valor: sensorValue });
});

// 📌 Endpoint para enviar comando (do app -> backend -> arduino)
app.post("/arduino", (req, res) => {
  const { comando } = req.body;
  if (!comando) return res.status(400).json({ erro: "Comando obrigatório" });

  console.log("📥 Comando recebido:", comando);

  if (MODO === "arduino" && port) {
    port.write(comando + "\n", (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.json({ status: "enviado", comando });
    });
  } else {
    // Simulação: só confirma
    return res.json({ status: "simulado", comando });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000");
  console.log(`⚡ MODO: ${MODO}`);
});
