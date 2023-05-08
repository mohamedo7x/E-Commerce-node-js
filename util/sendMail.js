import nodeMailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const sendMail = async(option) =>{
    const transport = nodeMailer.createTransport({
        host : process.env.MAILER_HOST,
        port : process.env.MAILER_PORT,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass:process.env.MAILER_PASS
        }
    })


    const emailOTP = {
        from : "E-commerce",
        to:option.email,
        subject : option.subject,
        html : option.message,
    }



    await transport.sendMail(emailOTP);
};

export default sendMail;


