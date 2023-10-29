const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_BASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Successful connection....");
}).catch((err)=>{
    console.log(err);
})
