function pv(ctx){
  global.console.log(ctx.session)
  ctx.session.count++
}

module.exports=function(){
  return async function(ctx,next){
    pv(ctx);
    await next();
  }
}