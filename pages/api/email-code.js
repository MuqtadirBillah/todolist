import mysql from "./mysql-connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
var nodeoutlook = require('nodejs-nodemailer-outlook');

export default function handler(req, res) {
    if(req.method=='GET'){
        res.status(404).json({ name: 'Error Page Not Found!' })
    }
    else{
        mysql.query(`select pin_code from user where user_email = "${req.body.email}"`, (error, result)=>{
            if(error){
                console.log(error);
                res.send("Something went wrong!");
            }
            else{
                nodeoutlook.sendEmail({
                    auth: {
                        user: "voice-recorder@outlook.com",
                        pass: process.env.OUTLOOK_PASSWORD
                    },
                    from: 'voice-recorder@outlook.com',
                    to: `${req.body.email}`,
                    subject: `Verification Code`,
                    html: `<p>Respected Sir/Madam,<br />Your verification code is ${result[0].pin_code}<p>Best Regards</p>`,
                    replyTo: 'voice-recorder@outlook.com',
                    attachments: [],
                    onError: (e) => {console.log(e); res.send('Something went wrong!')},
                    onSuccess: (i) => {console.log(i); res.send('sent!')}
                });
            }
        })
    }
}