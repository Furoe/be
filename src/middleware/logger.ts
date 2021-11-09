import { Context, Next } from "koa"
import { LogPath } from "../config/constant"

const fs = require('fs')
const path = require('path')
const log4js = require('log4js')

//console.log(LogPath)

const logsDir = path.parse(LogPath).dir
if(!fs.existsSync(logsDir)){
  fs.mkdirSync(logsDir)
}

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    dateFile: {
      type: 'dateFile',
      fileName: LogPath,
      pattern: '-yyyy-MM-dd'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'dateFile'],
      level: 'error'
    }
  }
})

export const logger = log4js.getLogger('[Default]')

export const loggerMiddleware = async (ctx: Context, next: Next) => {
  const start = +new Date()
  await next()
  const ms = +new Date() - start

  const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips
  const logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数：${JSON.stringify(ctx.request)} 响应参数：${ctx.body} - ${remoteAddress} - ${ms}ms`
  logger.info(logText)
}