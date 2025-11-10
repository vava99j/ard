import axios from "axios";
import PathArd from "./path.js";
import { SerialPort, ReadlineParser} from "serialport";

export default async function Arduino(porta) {

  const API_BASE = 'https://servidor-632w.onrender.com/arduinos';
  const cod_ard = "tec-1";
  const port = new SerialPort({ path: porta, baudRate: 9600 }, (err) => {
    if (err) {
      console.error('❌ Erro ao abrir a porta:', err.message);
    } else {
      console.log(`🔌 Porta ${porta} aberta!`);
    }
  });

  try {
    console.log(`🔍 Buscando dados do Arduino com código: ${cod_ard}...`);
    const response = await axios.get(`${API_BASE}/${cod_ard}`);
    const [dados] = response.data;
    const hor = dados.horarios;
    console.log('\n📦 Dados recebidos:');
    console.log(hor);

    const numeros = hor.match(/\d+(?=h)/g).map(Number);
    console.log("📊 Números extraídos:", numeros);

    for (let i = 0; i < numeros.length; i++) {
      if (numeros[i] == 0) {
        numeros[i] = null;
      } else {
        numeros[i] = numeros[i] * 3600 * 1000
      }
    }

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    port.on("open", () => {
      setTimeout(() => {
function cicloRelé(lig, des, tempoLigado, tempoDesligado) {
  port.write(lig);
  console.log(`🔔 ${lig} LIGADO`);

  setTimeout(() => {
    port.write(des);
    console.log(`🔕 ${des} DESLIGADO`);

    setTimeout(() => {
      cicloRelé(lig, des, tempoLigado, tempoDesligado);
    }, tempoDesligado);

  }, tempoLigado);
}

if(numeros[0] != 0)cicloRelé('1','A', 20*60*1000, numeros[0]); 
if(numeros[1] != 0)cicloRelé('2','B', 1*60*1000, numeros[1]);  
if(numeros[2] != 0)cicloRelé('3','C', 1*60*1000, numeros[2]);  
if(numeros[3] != 0)cicloRelé('4','D', 1*30*1000, numeros[3]);    

 }, 200);})

parser.on('data', data => {
  const linhaCompleta = data.trim();
  const partes = linhaCompleta.split(' ');
  const statusSolo = partes[partes.length - 1];

  if (statusSolo === 'UMIDO' || statusSolo === 'SECO') {
    console.log(`[${new Date().toLocaleTimeString()}] Status Atual do Solo: **${statusSolo}**`);
     PathArd(cod_ard, statusSolo)
    if (statusSolo === 'SECO') {
    }

  } else {
    console.log(`[Debug do Arduino] ${linhaCompleta}`);
  }
});


  
    port.on("data", data => {
      console.log("📥 Dados do Arduino:", data.toString());
    });

    process.stdin.resume();
  } catch (error) {

    console.error('❌ Erro ao buscar Arduino:', error.message)

  }
}