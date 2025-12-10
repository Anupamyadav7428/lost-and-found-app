import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();


const client=twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendSMS=async(phone , message)=>{
    await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: phone
    });
    console.log("SMS sent:", message.sid);
}
export default sendSMS;