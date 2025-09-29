import { SerialPort } from "serialport";

const port = new SerialPort({ path: "COM11", baudRate: 9600 });

port.on("open", () => {
  console.log("Conectado ao Arduino");

  setTimeout(() => {
    port.write("1"); // Liga LED no pino 4
    console.log("LED pino 1 ligado");
  }, 2000);

  setTimeout(() => {
    port.write("2"); // Liga LED no pino 7
    console.log("LED pino 2 ligado");
  }, 3000);

    setTimeout(() => {
    port.write("3"); // Liga LED no pino 7
    console.log("LED pino 3 ligado");
  }, 4000);

  setTimeout(() => {
    port.write("0"); // Apaga todos
    console.log("Todos LEDs desligados");
    port.close();
  }, 10000);

});
