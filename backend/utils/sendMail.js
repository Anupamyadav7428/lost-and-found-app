import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const sendMail=async(email , subject, message)=>{
    const tranport=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });

    await tranport.sendMail({
        from:`"Lost&Found" <${process.env.SMTP_USER}>`,
        to:email,
        subject,
        text:message

    }); 
};

export default sendMail;