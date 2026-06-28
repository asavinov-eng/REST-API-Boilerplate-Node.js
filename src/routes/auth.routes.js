import express from 'express'

const router = express.Router()

router.post('/register', (req, res) => {
  res.json({ message: 'register route' })
})

router.post('/login', (req, res) => {
  res.json({ message: 'login route' })
})

router.post('/refresh', (req, res) => {
  res.json({ message: 'refresh route' })
})

router.post('/logout', (req, res) => {
  res.json({ message: 'logout route' })
})

router.get('/me', (req, res) => {
  res.json({ message: 'me route' })
})

export default router