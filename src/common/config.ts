module.exports={
    host:'localhost',
    port:'3003',
    dbs:'mongodb://root:123456@localhost:27017/meituan?authSource=admin',
    dbOptions:{
        socketTimeoutMS: 0,
        keepAlive: true,
        reconnectTries: 30,
        useNewUrlParser:true
    }
};