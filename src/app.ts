const Koa = require('koa')
const koaBody = require("koa-body")
const Router = require('@koa/router')
const { logger, loggerMiddleware} = require('./middleware/logger')

const app = new Koa()
const router = new Router()
app.use(koaBody())
app.use(loggerMiddleware())

router.get('/', async (ctx: { body: { hello: string } }) => {
  ctx.body = {
    hello: 'world'
  }
})

app.use(router.routes())
const port = 3000

app.listen(port, () => {
  console.log(`Server runing on ${port}`)
})