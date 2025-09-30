import { SerialPort } from 'serialport';
import Arduino from "./comp.js";

export default async function ard() {

SerialPort.list().then(ports => {
  ports.forEach(port => {
    console.log(`Porta: ${port.path}`);
    Arduino(port.path);
  });
  
});

}
