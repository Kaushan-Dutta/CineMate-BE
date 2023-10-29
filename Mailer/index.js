const nodemailer=require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

let config={
    service:'gmail',
    auth:{
        user:process.env.MAILER_USER,
        pass:process.env.MAILER_PASWORD
    }
}
const transporter = nodemailer.createTransport(config);

var mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Cine Mate',
        link: 'https://cinemate.com/'
        
    }
});

const signup_email=()=>{
    var email = {
        body: {
            name: 'User',
            intro: 'Welcome to Cine Mate, we\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Cine Mate, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    return email
}

module.exports ={transporter,mailGenerator,signup_email};