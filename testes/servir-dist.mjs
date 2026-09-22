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

// O servidor imita o VERCEL, que é o host de produção — senão este ensaio não serviria para nada:
//   1. rota que não é arquivo devolve o index.html (é o que o `rewrites` do vercel.json faz);
//   2. /assets/ sai com cache imutável (é o que os `headers` do vercel.json fazem).
// A ressalva fica registrada: o GitHub Pages NÃO faz a reescrita — lá quem resolve rota profunda é
// o par `public/404.html` + o despertador no index.html.
const servidor = createServer(async (req, res) => {
  const caminho = decodeURIComponent((req.url || '/').split('?')[0])
  let alvo = join(RAIZ, normalize(caminho).replace(/^(\.\.[/\\])+/, ''))
  let existe = false

  try {
    const info = await stat(alvo)
    if (info.isDirectory()) alvo = join(alvo, 'index.html')
    existe = true
  } catch {
    existe = false
  }

  const temExtensao = extname(caminho) !== ''
  if (!existe) {
    // Arquivo que não existe (imagem, bundle): 404 de verdade, como no host.
    // Rota de aplicação (sem extensão): devolve o index.html, como o rewrite do Vercel.
    if (temExtensao) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('não encontrado')
      return
    }
    alvo = join(RAIZ, 'index.html')
  }

  try {
    const conteudo = await readFile(alvo)
    const cabecalhos = { 'Content-Type': TIPOS[extname(alvo)] || 'application/octet-stream' }
    if (caminho.startsWith('/assets/')) {
      cabecalhos['Cache-Control'] = 'public, max-age=31536000, immutable'
    }
    res.writeHead(200, cabecalhos)
    res.end(conteudo)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('não encontrado (o build existe? rode npm run build)')
  }
})

servidor.listen(PORTA, '127.0.0.1', () => {
  console.log(`servindo dist/ em http://127.0.0.1:${PORTA}`)
})
