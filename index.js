import axios from "axios";
import PathArd from "./path.js";
import { SerialPort, ReadlineParser } from "serialport";


export default async function Arduino(porta) {
    const cod_ard = "tec-1";
    const port = new SerialPort({
        path: porta,
        baudRate: 9600,
    });

    port.on('open', async () => {
        const API_BASE = 'https://servidor-632w.onrender.com/arduinos';
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
        function cicloRelé(lig, des, tempol, tempod) {
            setTimeout(() => {
                port.write(lig);
                setTimeout(() => {
                    port.write(des);
                }, tempol);
                cicloRelé(lig, des, tempol, tempod)
            }, tempod);
        }
        if (numeros[0] != 0) cicloRelé('1', 'A', 20 * 60 * 1000, numeros[0]);
        if (numeros[1] != 0) cicloRelé('2', 'B', 1 * 60 * 1000, numeros[1]);
        if (numeros[2] != 0) cicloRelé('3', 'C', 1 * 60 * 1000, numeros[2]);
        if (numeros[3] != 0) cicloRelé('4', 'D', 0.5 * 60 * 1000, numeros[3]);;
    });


    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
    parser.on('data', data => {
        const linhaCompleta = data.trim();
        const partes = linhaCompleta.split(' ');
        const statusSolo = partes[partes.length - 1];

        if (statusSolo === 'UMIDO' || statusSolo === 'SECO') {
            console.log(`[${new Date().toLocaleTimeString()}]
                    Status Atual do Solo: **${statusSolo}**`);
            PathArd(cod_ard, statusSolo)
        } else {
            console.log(`[Arduino]: ${linhaCompleta}`);
        }
        process.stdin.resume();
    });

}