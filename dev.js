const { execSync, spawn } = require("child_process");

try {
  console.log("🚀 Iniciando serviços e migrações...");
  execSync(
    "npm run services:up && npm run services:wait:database && npm run migrations:up",
    { stdio: "inherit" },
  );

  console.log("📡 Iniciando Next.js...");
  spawn("next", ["dev"], { stdio: "inherit" });

  // Captura o Ctrl+C (SIGINT)
  process.on("SIGINT", () => {
    console.log("\n🛑 Encerrando containers e servidor...");
    try {
      execSync("npm run services:stop", { stdio: "inherit" });
    } catch (e) {
      // Evita erro caso o docker já tenha parado
    }
    process.exit();
  });
} catch (error) {
  console.error("❌ Falha na inicialização:", error);
  process.exit(1);
}
