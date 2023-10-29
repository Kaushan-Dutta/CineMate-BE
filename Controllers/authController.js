const {userModel}=require('../Models/UserModel');
const EmailHandler = require('../Mailer/index');

const Authentication=async(req,res,next)=>{
    try{
        const {email,profile}=req.body;
        //console.log(email,profile);
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
        //console.log(createUser);
        await createUser.save();
        var signup_emailBody = EmailHandler.mailGenerator.generate(EmailHandler.signup_email());

        const info = await EmailHandler.transporter.sendMail({
            from:process.env.NODE_MAILER_FROM, 
            to: email,
            subject: "Confirmation Mail", 
            text: "Thanks for signing", 
            html: signup_emailBody,
        });
        //console.log("Message sent: %s", info);
        return res.status(200).json({message:'Confirmation mail is sent',data:createUser}) 
    }
    catch(err){
        return res.status(403).json({message:'User Error',data:err.message});
    }
}

module.exports={Authentication,Register}