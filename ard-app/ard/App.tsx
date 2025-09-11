// App.js
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

const API_URL = "http://localhost:3000"; // 👉 Troque pelo IP do seu PC

export default function App() {
  const enviarComando = (comando: string) => {
    fetch(`${API_URL}/arduino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comando }),
    })
      .then((res) => res.json())
      .then((data) => Alert.alert("Arduino", `✅ Comando enviado: ${data.comando}`))
      .catch((err) => Alert.alert("Erro", err.message));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>🎛 Controle do Arduino</Text>

      <TouchableOpacity
        onPress={() => enviarComando("REGAR")}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>💧 Regar Planta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => enviarComando("LUZ_ON")}
        style={{
          backgroundColor: "#FFD700",
          padding: 15,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 18 }}>💡 Ligar Luz</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => enviarComando("LUZ_OFF")}
        style={{
          backgroundColor: "#FF6347",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>💡 Desligar Luz</Text>
      </TouchableOpacity>
    </View>
  );
}