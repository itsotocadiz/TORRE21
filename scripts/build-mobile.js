const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'www');

console.log('[BUILD-MOBILE] Preparando empaquetado para Android...');

// Asegurar directorio www limpio
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Copiar index.html
const indexSrc = path.join(rootDir, 'index.html');
const indexDest = path.join(outDir, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, indexDest);
  console.log('✓ index.html copiado a www/');
}

// 2. Copiar carpetas css, js, assets
const dirsToCopy = ['css', 'js', 'assets'];
for (const d of dirsToCopy) {
  const s = path.join(rootDir, d);
  const t = path.join(outDir, d);
  if (fs.existsSync(s)) {
    copyRecursive(s, t);
    console.log(`✓ Carpeta ${d}/ copiada a www/`);
  }
}

console.log('[BUILD-MOBILE] ¡Empaquetado web completado con éxito en www/!');
