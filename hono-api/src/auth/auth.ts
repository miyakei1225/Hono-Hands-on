import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

app.get('/page', (c) => {
  return c.text('You are authorized')
})

export default app
