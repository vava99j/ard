import { SerialPort } from 'serialport';
import Arduino from "./comp.js";

SerialPort.list().then(ports => {
  ports.forEach(port => {
    console.log(`Porta: ${port.path}`);
    Arduino(port.path);
  });
});
