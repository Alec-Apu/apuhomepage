import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 11440
const HOST = '127.0.0.1'
const METING_API_BASE = process.env.METING_API_BASE || 'https://kennyz.cn:11444/meting/'
const isProd = process.env.NODE_ENV === 'production'

app.use(cors())
app.use(express.json())

// Meting API - music playlist proxy with 5-min cache
const metingCache = new Map()
app.get('/meting/', async (req, res) => {
  try {
    const { server, type, id } = req.query
    const key = `${server}:${type}:${id}`
    const cached = metingCache.get(key)
    if (cached && Date.now() - cached.t < 5 * 60 * 1000) return res.json(cached.data)

    const { data } = await axios.get(`${METING_API_BASE}?server=${server}&type=${type}&id=${id}`, { timeout: 10000 })
    metingCache.set(key, { data, t: Date.now() })
    res.json(data)
  } catch (err) {
    console.error('Meting error:', err.message)
    res.status(500).json({ error: 'Failed to fetch playlist' })
  }
})

// Static sub-pages (served before SPA fallback)
const staticBase = path.join(__dirname, isProd ? 'dist' : 'public')
const staticPages = ['I2B', 'I2B-old', 'ts-guide', 'UnlockMusic', 'upgrade-your-browser']
for (const name of staticPages) {
  app.use(`/${name}`, express.static(path.join(staticBase, name)))
}

// Production: serve built SPA
if (isProd) {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('/{*path}', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
} else {
  // Development: use Vite middleware
  const { createServer } = await import('vite')
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  })
  app.use(vite.middlewares)
}

app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`))
