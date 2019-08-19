const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const error = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const pv=require('./middleware/koa-pv')

const index = require('./routes/index')
const users = require('./routes/users')
const {port}=require('./dbs/config')
app.use(pv())
// error handler
error(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
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

app.listen(port,()=>{
  console.log(`app start at http://localhost:${port}`)
})

module.exports = app
