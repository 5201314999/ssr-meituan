const router = require('koa-router')()
import {User} from '../models/user'

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addUser',async(ctx,next)=>{
  const user=new User({
    phone:ctx.request.body.phone,
    name:ctx.request.body.name
  })
  await user.save()
  ctx.body={
    code:0
  } 
})

router.get('/getUser',async(ctx,next)=>{
  debugger
  const result=await User.findOne({name:ctx.request.query.name});
  const results=await User.find({name:ctx.request.query.name});
  ctx.body={
    code:0,
    result,
    results
  } 
})

module.exports = router
