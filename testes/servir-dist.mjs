// ============================================================================
// SERVIDOR DO BUILD — para conferir o que é SERVIDO, não o que foi construído.
//
// Por que existe: `vite preview` também carrega o vite.config.js, e isso passa pelo esbuild. Este
// servidor não: ele só entrega arquivos de `dist/`, do mesmo jeito que o GitHub Pages ou qualquer
// hospedagem estática entrega. Serve para responder "o bundle que está no ar contém as telas?".
//
// Uso:  node testes/servir-dist.mjs [porta]
// ============================================================================
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { resolve } from 'node:path'

const RAIZ = resolve(import.meta.dirname, '..', 'dist')
const PORTA = Number(process.argv[2] || 4173)

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
}

const servidor = createServer(async (req, res) => {
  const caminho = decodeURIComponent((req.url || '/').split('?')[0])
  let alvo = join(RAIZ, normalize(caminho).replace(/^(\.\.[/\\])+/, ''))

  try {
    const info = await stat(alvo)
    if (info.isDirectory()) alvo = join(alvo, 'index.html')
  } catch {
    // Rota que não é arquivo: o Pages entregaria o 404.html (é ele que devolve a rota para o app).
    alvo = join(RAIZ, '404.html')
  }

  try {
    const conteudo = await readFile(alvo)
    res.writeHead(200, { 'Content-Type': TIPOS[extname(alvo)] || 'application/octet-stream' })
    res.end(conteudo)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('não encontrado (o build existe? rode npm run build)')
  }
})

servidor.listen(PORTA, '127.0.0.1', () => {
  console.log(`servindo dist/ em http://127.0.0.1:${PORTA}`)
})
