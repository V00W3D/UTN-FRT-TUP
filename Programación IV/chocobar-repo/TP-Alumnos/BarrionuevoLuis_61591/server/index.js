import express from 'express'
import cors from 'cors'
import { profile, estudios, softSkills, proyectos, experiencia, idiomas, certificados } from './data.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/profile', (_, res) => res.json(profile))
app.get('/api/estudios', (_, res) => res.json(estudios))
app.get('/api/soft-skills', (_, res) => res.json(softSkills))
app.get('/api/proyectos', (_, res) => res.json(proyectos))
app.get('/api/experiencia', (_, res) => res.json(experiencia))
app.get('/api/idiomas', (_, res) => res.json(idiomas))
app.get('/api/certificados', (_, res) => res.json(certificados))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`))
