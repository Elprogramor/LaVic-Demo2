import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const adminRoot = path.join(root, "apps", "admin");
const targets = [
  path.join(adminRoot, ".next"),
  path.join(adminRoot, "tsconfig.tsbuildinfo"),
];

if (!fs.existsSync(adminRoot)) {
  console.error("[ERRO] apps/admin não foi encontrado. Execute o comando na raiz do projeto LaVic.");
  process.exit(1);
}

let removed = 0;
for (const target of targets) {
  if (!fs.existsSync(target)) continue;
  try {
    fs.rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 150 });
    console.log(`  ✓ cache removido: ${path.relative(root, target)}`);
    removed += 1;
  } catch (error) {
    console.error(`\n[ERRO] Não foi possível limpar ${path.relative(root, target)}.`);
    console.error("Pare qualquer 'npm run dev:admin' aberto (Ctrl+C) e execute a validação novamente.");
    if (error instanceof Error) console.error(`Detalhe: ${error.message}`);
    process.exit(1);
  }
}

if (removed === 0) {
  console.log("  ✓ nenhum cache antigo do Admin precisava ser removido");
}
console.log("  ✓ ambiente de typecheck/build do Admin está limpo");
