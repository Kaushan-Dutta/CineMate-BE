const {userModel}=require('../Models/UserModel');
const EmailHandler = require('../Mailer/index');

const request = require("request");

const Authentication=async(req,res,next)=>{
    try{
        const {email,profile}=req.body;
        const getUser=await userModel.find({email});
        if(getUser.length>0){
            return res.status(200).json({message:'Login Successful',data:getUser});
        }
        next();
    }
    catch(err){
        return res.status(403).json({message:'User Error',data:err.message});
    }
}

const Register=async(req,res)=>{
    try{
        const {email,nickname,picture}=req.body;
        const createUser=new userModel({email,profile:picture,username:nickname});
        await createUser.save();
        var signup_emailBody = EmailHandler.mailGenerator.generate(EmailHandler.signup_email());

        const info = await EmailHandler.transporter.sendMail({
            from:process.env.NODE_MAILER_FROM, 
            to: email,
            subject: "Confirmation Mail", 
            text: "Thanks for signing", 
            html: signup_emailBody,
        });
        return res.status(200).json({message:'Confirmation mail is sent',data:createUser}) 
    }
    catch(err){
        return res.status(403).json({message:'User Error',data:err.message});
    }
}


const Subscribe=async(req,res)=>{
     try{
        const addData = {
            members: [
               {
                  email_address: req.body.email,
                  status: "subscribed"
               }
            ]
        }
        const addDataJson = JSON.stringify(addData);
        const options = {
            url: process.env.MAILCHIMP_API,
            method: 'POST',
            headers: {
               Authorization: 'Basic ' + Buffer.from('anystring:process.env.MAILCHIMP_API_KEY').toString('base64') 

            },
            body: addDataJson
         }
        request (options, (error, response, body) => {
            if(error) {
                console.log(error);
                return res.status(500).json({message:'Subscription failed',data:err.message});
            } else {

                return res.status(200).json({message:'Subscribed successfully'}) 
            }
        })
     }
     catch(err){
        return res.status(500).json({message:'Subscription failed',data:err.message});
     }
}
module.exports={Authentication,Register,Subscribe}