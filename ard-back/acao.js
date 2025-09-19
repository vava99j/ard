import { SerialPort } from 'serialport';
export function ligarLuz(){
// 🛠️ Ajuste sua porta COM aqui
const port = new SerialPort({
  path: 'COM11',
  baudRate: 9600,
});

// ⏱️ Configurações do tempo (em segundos)
const tempoAntesDeLigar = 5; // Espera 5 segundos antes de ligar o LED
const tempoLigado = 3;       // LED ficará aceso por 3 segundos

port.on('open', () => {
  console.log(`Porta serial aberta. Esperando ${tempoAntesDeLigar}s antes de ligar o LED...`);

  setTimeout(() => {
    // Envia comando para LIGAR o LED
    port.write('1', (err) => {
      if (err) return console.error('Erro ao ligar LED:', err.message);
      console.log(`LED ligado. Ficará aceso por ${tempoLigado}s...`);
    });

    // Depois de tempoLigado, envia comando para DESLIGAR o LED
    setTimeout(() => {
      port.write('0', (err) => {
        if (err) return console.error('Erro ao desligar LED:', err.message);
        console.log('LED desligado.');
      });
    }, tempoLigado * 1000);

  }, tempoAntesDeLigar * 1000);
});

port.on('error', (err) => {
  console.error('Erro na porta serial:', err.message);
});
}