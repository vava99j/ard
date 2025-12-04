import { SerialPort } from 'serialport';
import Arduino from "./index.js";

SerialPort.list().then(ports => {
  ports.forEach(port => {
    console.log(`Porta: ${port.path}`);
    Arduino(port.path);
  });
});
