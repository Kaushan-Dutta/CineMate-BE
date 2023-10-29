const Razorpay = require('razorpay');

const Payment=async(req,res)=>{
    try{
        
          
        return res.status(200).json({message:"Payment Successful"})
    
    }
    catch{
        return res.status(200).json({message:"Payment Failed",data:order});
    }
}
module.exports={Payment};