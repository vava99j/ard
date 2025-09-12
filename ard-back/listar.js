import { SerialPort } from "serialport";

SerialPort.list().then(ports => {
  console.log("Portas disponíveis:");
  ports.forEach(p => console.log(p.path, p.friendlyName));
});
