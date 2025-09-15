import { SerialPort } from 'serialport';

SerialPort.list().then(ports => {
  ports.forEach(port => {
    console.log(`Porta: ${port.path}`);
  });
});
