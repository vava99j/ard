import axios from "axios";
import { SerialPort } from "serialport";


export default async function Arduino(porta) {
const API_BASE = 'https://servidor-632w.onrender.com/arduinos';
const cod_ard = "tec-1";

const port = new SerialPort({ path: porta, baudRate: 9600 });

  try {
    console.log(`🔍 Buscando dados do Arduino com código: ${cod_ard}...`);
    const response = await axios.get(`${API_BASE}/${cod_ard}`);

    const [dados] = response.data;
    const hor = dados.horarios;
    console.log('\n📦 Dados recebidos:');
    console.log(hor);

    const numeros = hor.match(/\d+(?=h)/g).map(Number);
    console.log("📊 Números extraídos:", numeros);

  for(let i=0 ; i<numeros.length ; i++){
  if(numeros[i] == 0) {
    numeros[i] = null;
  } else {
    numeros[i] = numeros[i] * 3600 * 1000
  }
}


const agua = numeros[0]
const sol = numeros[1]
const ventilacao = numeros[2]
const irrigacao = numeros[3]


//  port.on("open", () => {
    console.log("Conectado ao Arduino")
    console.log("agua")
        // port.write("1")
    console.log("sol")
        // port.write("2")
    console.log("ventilação")
        // port.write("3")
    console.log("irrigação")
        // port.write("4")

  
    if (agua !== null) {
      setInterval(() => {
        console.log("agua")
        // port.write("1")
      }, agua);
    }

    if (sol !== null) {
      setInterval(() => {
        console.log("sol")
        // port.write("2")
      }, sol);
    }

    if (ventilacao !== null) {
      setInterval(() => {
        console.log("ventilação")
        // port.write("3")
      }, ventilacao);
    }

    if (irrigacao !== null) {
      setInterval(() => {
        console.log("irrigação")
        // port.write("4");
      }, irrigacao);
    }
  //})

  } catch (error) {
    console.error('❌ Erro ao buscar Arduino:', error.message)
  }
}


