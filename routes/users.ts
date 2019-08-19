const router = require('koa-router')()
const User= require('../dbs/models/user')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPersion',async(ctx,next)=>{
  const user=new User({
    id:ctx.request.body.id,
    name:ctx.request.body.name
  })
  await user.save()
  ctx.body={
    res:0
  }
})

module.exports = router

export{}
