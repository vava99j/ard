import axios from "axios";

const API_BASE = 'https://servidor-632w.onrender.com/arduinos';
const cod_ard = 'tec-1'; // Altere se quiser outro código

async function buscarArduino() {
  try {
    console.log(`Buscando dados do Arduino com código: ${cod_ard}...`);
    const response = await axios.get(`${API_BASE}/${cod_ard}`);
    
    const [dados] = response.data;
    console.log('\n📦 Dados recebidos:');
    console.log(dados.horarios)
  } catch (error) {
    console.error('❌ Erro ao buscar Arduino:', error.message);
  }
}

buscarArduino();
