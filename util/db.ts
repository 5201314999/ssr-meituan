//数据库连接代码
const mongoose=require('mongoose');

const {database,dbOptions}=require('../config/config');
mongoose.connect(database, dbOptions);
const db=mongoose.connection;
db.on('error',(e:any)=>{console.error('数据库连接失败'+e)});
db.once('open',()=>{
    console.log('数据库连接成功');
});
