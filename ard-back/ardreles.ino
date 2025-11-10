// Definição dos pinos que conectarão ao módulo relé
// O pino 7 controlará o Relé 1 (Canal 1)
const int relePin1 = 7; 
// O pino 6 controlará o Relé 2 (Canal 2)
const int relePin2 = 6; 

// --- Configuração (roda apenas uma vez ao ligar ou resetar) ---
void setup() {
  // Configura os pinos como SAÍDA
  pinMode(relePin1, OUTPUT);
  pinMode(relePin2, OUTPUT);

  // Inicialmente, DESLIGA ambos os relés (assumindo módulo de "Low Level Trigger")
  // NOTA: A maioria dos módulos relé para Arduino são acionados com LOW (Nível Lógico Baixo)
  // Se o seu módulo for acionado com HIGH, inverta os estados (HIGH para desligar, LOW para ligar)
  digitalWrite(relePin1, HIGH); // HIGH = Relé 1 DESLIGADO (Estado Comum)
  digitalWrite(relePin2, HIGH); // HIGH = Relé 2 DESLIGADO (Estado Comum)

  // Inicia a comunicação serial para debug (opcional)
  Serial.begin(9600);
  Serial.println("Programa de controle de rele iniciado.");
}

// --- Loop Principal (roda continuamente) ---
void loop() {
  // 1. LIGA o Relé 1 (pino 7) e DESLIGA o Relé 2 (pino 6)
  Serial.println("Relé 1 LIGADO | Relé 2 DESLIGADO");
  
  // LIGAR o Relé 1 (LOW, se for Low Level Trigger)
  digitalWrite(relePin1, LOW); 
  // DESLIGAR o Relé 2
  digitalWrite(relePin2, HIGH);

  // Espera 2 segundos
  delay(2000); 

  // 2. DESLIGA o Relé 1 (pino 7) e LIGA o Relé 2 (pino 6)
  Serial.println("Relé 1 DESLIGADO | Relé 2 LIGADO");

  // DESLIGAR o Relé 1
  digitalWrite(relePin1, HIGH);
  // LIGAR o Relé 2 (LOW, se for Low Level Trigger)
  digitalWrite(relePin2, LOW);

  // Espera 2 segundos
  delay(2000); 
}