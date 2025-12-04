export default async function PathArd(cod_ard, umd) {
  try {
    const res = await fetch(`https://servidor-632w.onrender.com/arduinos/${cod_ard}/${umd}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error(`❌ Erro: ${res.status} - ${res.statusText}`);
      const erro = await res.text();
      console.error("Detalhes:", erro);
      return;
    }

    const data = await res.json();
    console.log("✅ Resposta da API:", data);
  } catch (error) {
    console.error("❌ Erro na requisição:", error.message);
  }
}

