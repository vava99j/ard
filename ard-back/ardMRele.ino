const int R1 = 7;
const int R2 = 6;
const int R3 = 5;
const int R4 = 4;
const int pinoSensorUmidade = A0;

const int LIMIAR_SECO = 800;
int valorUmidade = 0;
String statusSoloAtual = "";
String statusSoloAnterior = "INICIAL";

void setup() {
  pinMode(R1, OUTPUT);
  pinMode(R2, OUTPUT);
  pinMode(R3, OUTPUT);
  pinMode(R4, OUTPUT);
  Serial.begin(9600);
  Serial.println("Arduino pronto. Aguardando comandos do Node.js...");
  digitalWrite(R1, HIGH);
  digitalWrite(R2, HIGH);
  digitalWrite(R3, HIGH);
  digitalWrite(R4, HIGH);

  Serial.println("Monitor de Umidade do Solo Iniciado. Enviando apenas em caso de alteracao.");
}
void loop() {
  if (Serial.available() > 0) {
    char comando = Serial.read();

    Serial.print("Comando recebido: ");
    Serial.println(comando);

    switch (comando) {
      case '1': digitalWrite(R1, LOW); break;
      case '2': digitalWrite(R2, LOW); break;
      case '3': digitalWrite(R3, LOW); break;
      case '4': digitalWrite(R4, LOW); break;

      case 'A': digitalWrite(R1, HIGH); break;
      case 'B': digitalWrite(R2, HIGH); break;
      case 'C': digitalWrite(R3, HIGH); break;
      case 'D': digitalWrite(R4, HIGH); break;

      default: Serial.println("Comando desconhecido!"); break;
    }
  }

  valorUmidade = analogRead(pinoSensorUmidade);

  if (valorUmidade > LIMIAR_SECO) {
    statusSoloAtual = "SECO";
  } else {
    statusSoloAtual = "UMIDO";
  }

  if (statusSoloAtual != statusSoloAnterior) {
    Serial.print("Status do solo: ");
    Serial.println(statusSoloAtual);
    Serial.print("Valor Bruto: ");
    Serial.println(valorUmidade);
    statusSoloAnterior = statusSoloAtual;
  }

  delay(500); 
}
