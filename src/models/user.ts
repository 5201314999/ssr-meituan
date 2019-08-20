// 用户
import {Schema,Model,model,Document} from 'mongoose';

interface UserDocument extends Document {
    id:string
    name?:string,
    phone?:string,
    address?:string
}
const schema:Schema=new Schema({
    id:{
        type:Schema.Types.ObjectId,
        require:true
    },
    name:String,
    phone:{
        type:String,
    },
    address:String
});

export const user:Model<UserDocument>=model('User',schema,'user');