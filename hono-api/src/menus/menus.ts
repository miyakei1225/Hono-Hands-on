import { Hono } from 'hono'

const app = new Hono()

let foodMenus = [
  {
    id: '1',
    name: 'ラーメン',
    content: 'ほうれん草マシがおすすめです'
  },
  {
    id: '2',
    name: 'カレー',
    content: 'キーマカレーが好きです'
  },
  {
    id: '3',
    name: '焼肉',
    content: 'やっぱり牛タンだよね！'
  }
]

app.get('/', (c) => c.json({ post: foodMenus }))

app.get('/:id', (c) => {
  const id = c.req.param('id')
  const post = foodMenus.find((p) => p.id === id)

  if (post) return c.json(post)
  return c.json({ message: 'ページが見つかりませんでした' }, 404)
})

app.post('/', async (c) => {
  const { name, content } = await c.req.json<{
    name: string
    content: string
  }>()
  const newPost = { id: String(foodMenus.length + 1), name, content }
  foodMenus = [...foodMenus, newPost]
  return c.json(newPost, 201)
})

app.put('/:id', async (c) => {
  const id = c.req.param('id')
  const index = foodMenus.findIndex((p) => p.id === id)

  if (index === -1) return c.json({ message: 'メニューが見つかりませんでした' }, 404)

  const { name, content } = await c.req.json()
  foodMenus[index] = { ...foodMenus[index], name, content }

  return c.json(foodMenus[index])
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const index = foodMenus.findIndex((p) => p.id === id)

  if (index === -1) return c.json({ message: 'メニューが見つかりませんでした' }, 404)

  foodMenus = foodMenus.filter((p) => p.id !== id)

  return c.json({ message: 'メニューが削除されました' })
})

export default app
