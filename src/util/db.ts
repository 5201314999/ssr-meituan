//数据库连接代码
const mongoose=require('mongoose');

const {dbs,dbOptions}=require('../common/config');
mongoose.connect(dbs, dbOptions);
const db=mongoose.connection;
db.on('error',(e:any)=>{console.error('数据库连接失败'+e)});
db.once('open',()=>{
    console.log('数据库连接成功');
});
