import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [sensor, setSensor] = useState<string>("...");
  const [horaAtual, setHoraAtual] = useState<string>("");
  const [comandoEnviado, setComandoEnviado] = useState(false);

  // Simula string vinda do banco (pode futuramente vir da API)
  const programacao =
    "Horarios da planta: Dracaena braunii água: 17h, sol: 6h, ventilação: 0h, irrigação do solo: 0h.";

  // Extrai horário do formato 'Xh' para 'HH:00:00'
  function extrairHorario(str: string, chave: string) {
    const regex = new RegExp(`${chave}\\s*:\\s*(\\d{1,2})h`, "i");
    const match = str.match(regex);
    if (match) {
      const hora = match[1].padStart(2, "0");
      return `${hora}:00:00`;
    }
    return null;
  }

  const horarioInicio = extrairHorario(programacao, "água");
  const horarioFim = extrairHorario(programacao, "sol");

  // Função para verificar se hora está dentro do intervalo (com tratamento de meia-noite)
  function estaNoIntervalo(hora: string, inicio: string, fim: string) {
    if (inicio <= fim) {
      return hora >= inicio && hora <= fim;
    } else {
      return hora >= inicio || hora <= fim;
    }
  }

  // Atualiza sensor a cada 2s
  useEffect(() => {
    const intervaloSensor = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3000/sensor");
        setSensor(res.data.valor);
      } catch (err) {
        console.error("Erro ao buscar sensor:", err);
      }
    }, 2000);

    return () => clearInterval(intervaloSensor);
  }, []);

  // Atualiza hora e verifica horário para enviar comando automático a cada 1s
  useEffect(() => {
    const intervaloHora = setInterval(() => {
      const agora = new Date();
      const horaStr = agora.toLocaleTimeString("pt-BR", { hour12: false });
      setHoraAtual(horaStr);

      if (horarioInicio && horarioFim) {
        if (estaNoIntervalo(horaStr, horarioInicio, horarioFim)) {
          if (!comandoEnviado) {
            enviarComando("REGAR");
            setComandoEnviado(true);
          }
        } else {
          setComandoEnviado(false);
        }
      }
    }, 1000);

    return () => clearInterval(intervaloHora);
  }, [comandoEnviado, horarioInicio, horarioFim]);

  // Função para enviar comando para backend → Arduino
  const enviarComando = async (cmd: string) => {
    try {
      await axios.post("http://localhost:3000/arduino", { comando: cmd });
      console.log("Comando enviado:", cmd);
    } catch (err) {
      console.error("Erro ao enviar comando:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📡 Valor do sensor:</Text>
      <Text style={styles.sensor}>{sensor}</Text>

      <Text style={{ marginVertical: 10 }}>
        🕒 Hora atual: {horaAtual}
      </Text>

      <Text>
        ⏱️ Programado entre: {horarioInicio} → {horarioFim}
      </Text>

      <View style={styles.botoes}>
        <Button title="Ligar LED" onPress={() => enviarComando("ON")} />
      </View>
      <View style={styles.botoes}>
        <Button title="Desligar LED" onPress={() => enviarComando("OFF")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sensor: {
    fontSize: 24,
    marginVertical: 10,
  },
  botoes: {
    marginVertical: 5,
    width: "60%",
  },
});
