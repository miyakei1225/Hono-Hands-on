import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { View } from './jsx/View'
import { prettyJSON } from 'hono/pretty-json'
import menus from './menus/menus'
import auth from './auth/auth'

const app = new Hono()

app.use('*', prettyJSON())
app.use(
  '/auth/*',
  basicAuth({
    username: 'admin',
    password: 'secret'
  })
)

app.route('/menus', menus)
app.route('/auth', auth)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/hello', (c) => {
  return c.json({
    ok: true,
    message: 'Hello Hono!'
  })
})

app.get('/posts/:id', (c) => {
  const page = c.req.query('page')
  const id = c.req.param('id')
  c.header('X-Message', 'Hi!')
  return c.text(`You want see ${page} of ${id}`)
})

app.get('/page', (c) => {
  return c.html(<View />)
})

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

export default app
