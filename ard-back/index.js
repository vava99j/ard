import { SerialPort, ReadlineParser } from "serialport";
// --- ⚠️ CONFIGURAÇÃO OBRIGATÓRIA ⚠️ ---
// SUBSTITUA AQUI pelo nome da porta serial do seu Arduino!
const portaArduino = 'COM5'; 
const baudRate = 9600; // Deve ser o mesmo do Arduino (Serial.begin(9600))
// ----------------------------------------

// Cria a instância de SerialPort
const port = new SerialPort({
  path: portaArduino,
  baudRate: baudRate,
});

// Configura o parser para ler os dados linha por linha (separado por \n)
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// --- Eventos da Porta Serial ---

// Evento: Quando a porta serial é aberta com sucesso
port.on('open', () => {
  console.log('✅ CONECTADO ao Arduino na porta: ' + portaArduino);
  console.log('Monitoramento de status de umidade iniciado. Aguardando MUDANÇAS...');
});

// Evento: Quando dados são recebidos (uma linha completa)
parser.on('data', data => {
  const statusRecebido = data.trim();
  
  // O Arduino está enviando apenas "UMIDO" ou "SECO" quando há alteração.
  if (statusRecebido === 'UMIDO' || statusRecebido === 'SECO') {
    
    // Status VÁLIDO e ATUALIZADO
    console.log('\n======================================');
    console.log(`[${new Date().toLocaleTimeString()}] **ALERTA DE MUDANÇA!**`);
    console.log(`NOVO STATUS DO SOLO: **${statusRecebido}**`);
    console.log('======================================');
    
    // --- Lógica de Ação ---
    if (statusRecebido === 'SECO') {
      console.log('⚠️ AÇÃO NECESSÁRIA: O solo precisa de água! (Inicie a bomba, envie um SMS, etc.)');
    } else {
      console.log('🎉 STATUS BOM: O solo está úmido o suficiente.');
    }

  } else {
    // Para capturar outras mensagens de inicialização ou debug do Arduino.
    console.log(`[Mensagem de Debug/Inicialização do Arduino]: ${statusRecebido}`);
  }
});

// Evento: Erros na comunicação serial
port.on('error', err => {
  console.error('❌ ERRO NA COMUNICAÇÃO SERIAL:', err.message);
  console.log('Dica: Verifique se a porta serial (path) está configurada corretamente e se o Arduino não está sendo usado pelo Monitor Serial da IDE.');
});