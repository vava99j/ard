const int R1 = 7; 
const int R2 = 6; 
const int R3 = 5; 
const int R4 = 4; 

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
}

void loop() {
  if (Serial.available() > 0) {
    char comando = Serial.read(); 
    
    Serial.print("Comando recebido: ");
    Serial.println(comando);
    
    if (comando == '1') {
      digitalWrite(R1, LOW); 
    } else if (comando == '2') {
      digitalWrite(R2, LOW);
    } else if (comando == '3') {
      digitalWrite(R3, LOW);
    } else if (comando == '4') {
      digitalWrite(R4, LOW);
    }

    else if (comando == 'A') {
      digitalWrite(R1, HIGH); 
    } else if (comando == 'B') {
      digitalWrite(R2, HIGH);
    } else if (comando == 'C') {
      digitalWrite(R3, HIGH);
    } else if (comando == 'D') {
      digitalWrite(R4, HIGH);
    }
  }
}