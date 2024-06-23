import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { View } from './jsx/View'

const app = new Hono()

app.get('/', c => {
  return c.text('Hello Hono!')
})

// Raw Responseを返す実装例
// app.get("/", (c) => {
//   return new Response("Good morning!");
// });

app.get('/api/hello', c => {
  return c.json({
    ok: true,
    message: 'Hello Hono!',
  })
})

app.get('/posts/:id', c => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

app.get('/page', c => {
  return c.html(<View />)
})

// Basic Auth
app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'secret',
  }),
)

app.get('/admin', c => {
  return c.text('You are authorized!')
})

export default app
