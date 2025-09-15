import fetch from 'node-fetch';
import { SerialPort } from 'serialport';

const API_URL = 'https://seuservidor.com/api/led';
const SERIAL_PORT = '/dev/ttyACM0'; // ou /dev/ttyUSB0, dependendo do Arduino

const port = new SerialPort({ path: SERIAL_PORT, baudRate: 9600 });

async function buscarEEnviarComando() {
  try {
    const res = await fetch(API_URL);
    const { ligar, tempo } = await res.json();

    if (ligar) {
      setTimeout(() => {
        port.write('1'); // Liga o LED
        console.log('LED ligado');

        setTimeout(() => {
          port.write('0'); // Desliga
          console.log('LED desligado');
        }, tempo * 1000);

      }, 0);
    }
  } catch (err) {
    console.error('Erro ao acessar a API:', err.message);
  }
}

port.on('open', () => {
  console.log('Conectado ao Arduino.');
  buscarEEnviarComando(); // Executa ao iniciar
});

/* 
char comando;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
}

void loop() {
  if (Serial.available()) {
    comando = Serial.read();
    if (comando == '1') digitalWrite(13, HIGH);
    if (comando == '0') digitalWrite(13, LOW);
  }
}

*/