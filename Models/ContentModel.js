const mongoose=require('mongoose');
require('../connectDb');

const contentSchema=new mongoose.Schema({
    type:{
        type:String,required:true
    },
    description:{
        type:String,required:true
    },
    fileId:{
        type:String,required:true
    },
    url:{
        type:String,required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,ref:'UserModel'
    }
},{timestamps:true})
const contentModel=new mongoose.model('ContentModel',contentSchema);

module.exports={contentModel};