import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// BASE DO SITE
// No GitHub Pages o projeto não fica na raiz: fica em /<nome-do-repo>/. Por isso o prefixo é uma
// variável de ambiente, definida pelo workflow. Sem ela (máquina local, domínio próprio, Vercel),
// o site é servido na raiz e nada muda.
const base = process.env.VITE_BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  logLevel: 'error',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
