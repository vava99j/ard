import { ligarluz } from "./acao";
let horaAtual = "";

function relogio() {
  const agora = new Date();
  horaAtual = agora.toLocaleTimeString('pt-BR', { hour12: false });
  console.clear();
  console.log(`🕒 Hora atual: ${horaAtual}`);
}

// Simula string vinda do banco
const programacao = "Horarios da planta: Dracaena braunii água: 17h, sol: 6h, ventilação: 0h, irrigação do solo: 0h.";

function extrairHorario(str, chave) {
  const regex = new RegExp(`${chave}\\s*:\\s*(\\d{1,2})h`, 'i');
  const match = str.match(regex);
  if (match) {
   ligarluz()
  }
  return null;
}

const horarioInicio = extrairHorario(programacao, "água");
const horarioFim = extrairHorario(programacao, "sol");

console.log("⏱️ Programado entre:", horarioInicio, "→", horarioFim);

function estaNoIntervalo(hora, inicio, fim) {
  if (inicio <= fim) {
    return hora >= inicio && hora <= fim;
  } else {
    return hora >= inicio || hora <= fim;
  }
}

let comandoEnviado = false;

setInterval(() => {
  relogio();

  if (horarioInicio && horarioFim) {
    if (estaNoIntervalo(horaAtual, horarioInicio, horarioFim)) {
      if (!comandoEnviado) {
        console.log("🚿 Enviar comando para regar!");
        comandoEnviado = true;
      }
    } else {
      comandoEnviado = false;
    }
  } else {
    console.log("⚠️ Horários inválidos ou não encontrados");
  }
}, 1000);



