import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [sensor, setSensor] = useState<string>("...");

  // Atualiza o valor do sensor a cada 2s
  useEffect(() => {
    const intervalo = setInterval(async () => {
      try {
        const res = await axios.get("http://10.0.2.2:3000/sensor"); 
        // ⚠️ IMPORTANTE:
        // - No emulador Android do Expo use "10.0.2.2"
        // - Se for celular físico, troque por IP da sua máquina (ex: "http://192.168.0.10:3000")
        setSensor(res.data.valor);
      } catch (err) {
        console.error("Erro ao buscar sensor:", err);
      }
    }, 2000);

    return () => clearInterval(intervalo);
  }, []);

  // Enviar comando para backend → Arduino
  const enviarComando = async (cmd: string) => {
    try {
      await axios.post("http://10.0.2.2:3000/arduino", { comando: cmd });
      console.log("Comando enviado:", cmd);
    } catch (err) {
      console.error("Erro ao enviar comando:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📡 Valor do sensor:</Text>
      <Text style={styles.sensor}>{sensor}</Text>

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
