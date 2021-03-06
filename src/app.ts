const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const error = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session =require('koa-generic-session')
const Redis=require('koa-redis')
const pv=require('./middleware/koa-pv')
require('./util/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
error(app)
app.use(session({
  key:'mt',
  prefix:'pr',
  store:new Redis()
}))
app.use(pv())

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.keys=['keys','keyskeys']
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start: any= new Date()
  await next()
  const ms = <any>new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
