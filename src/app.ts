const Koa = require('koa')
const koaBody = require("koa-body")
const BodyParser = require("koa-bodyparser")
const Router = require('@koa/router')
const { logger, loggerMiddleware} = require('./middleware/logger')

const app = new Koa()
const router = new Router()

app.use(loggerMiddleware)


app.use(koaBody())

app.use(BodyParser())

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