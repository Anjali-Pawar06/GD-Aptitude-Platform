import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Groq from 'groq-sdk'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' } })

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'COGNEXA API' }))

app.post('/api/gd/respond', async (req, res) => {
  const { topic, persona, history = [], studentMessage } = req.body
  if (!topic || !persona || !studentMessage) return res.status(400).json({ error: 'topic, persona and studentMessage are required' })

  if (!groq) {
    return res.json({
      persona,
      text: persona === 'Ryan'
        ? 'That is an interesting argument, but what evidence or practical example supports it? We should also consider the opposite viewpoint.'
        : 'I agree that this deserves a balanced view. We should consider both the benefits and the challenges before reaching a conclusion.'
    })
  }

  const system = `You are ${persona}, an AI participant in a college placement Group Discussion.
Topic: ${topic}.
Respond naturally in 2-4 sentences. Stay professional. Do not dominate the discussion.
Persona: ${persona === 'Alex' ? 'logical and evidence-oriented' : persona === 'Ryan' ? 'challenging and skeptical' : 'cooperative and constructive'}.`

  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: system },
      ...history.slice(-8).map((m: { role: 'user'|'assistant'; content: string }) => ({ role: m.role, content: m.content })),
      { role: 'user', content: studentMessage }
    ],
    temperature: 0.7,
    max_tokens: 180
  })

  res.json({ persona, text: completion.choices[0]?.message?.content || 'Let us consider another perspective.' })
})

app.post('/api/gd/evaluate', async (req, res) => {
  const { transcript = [] } = req.body
  if (!groq) {
    return res.json({ content: 8.5, relevance: 9, communication: 7.5, participation: 8, strengths: ['Relevant arguments','Good topic understanding','Consistent participation'], improvements: ['Improve clarity of arguments','Support points with examples'] })
  }

  const prompt = `Evaluate the student's Group Discussion performance from this transcript.
Return ONLY valid JSON with numeric scores 0-10 for content, relevance, communication, participation and arrays strengths and improvements.
Transcript:
${JSON.stringify(transcript)}`

  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    max_tokens: 400
  })
  try { res.json(JSON.parse(completion.choices[0]?.message?.content || '{}')) }
  catch { res.status(502).json({ error: 'Could not parse evaluation response' }) }
})

io.on('connection', socket => {
  socket.on('join-gd', (roomId: string) => { socket.join(roomId); socket.to(roomId).emit('participant-joined', { id: socket.id }) })
  socket.on('gd-message', (data: { roomId: string; message: unknown }) => socket.to(data.roomId).emit('gd-message', data.message))
  socket.on('leave-gd', (roomId: string) => socket.leave(roomId))
})

const port = Number(process.env.PORT || 5000)
httpServer.listen(port, () => console.log(`COGNEXA API running on http://localhost:${port}`))
