const mongoose=require('mongoose');
require('../connectDb');

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },

});
const adminModel=new mongoose.model('AdminModel',adminSchema);
module.exports={adminModel};