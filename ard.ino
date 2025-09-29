int led = 4;
int led1 = 7;

void setup() {
  pinMode(led, OUTPUT);
  pinMode(led1, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char comando = Serial.read();

    if (comando == '1') {
      // 1 - Todos ligam
      digitalWrite(led, HIGH);
      digitalWrite(led1, HIGH);

    } else if (comando == '2') {
      // 2 - led ligado, led1 desligado
      digitalWrite(led, HIGH);
      digitalWrite(led1, LOW);

    } else if (comando == '3') {
      // 3 - led desligado, led1 ligado
      digitalWrite(led, LOW);
      digitalWrite(led1, HIGH);

    } else if (comando == '0') {
      // 0 - Todos desligados
      digitalWrite(led, LOW);
      digitalWrite(led1, LOW);
    }
  }
}
