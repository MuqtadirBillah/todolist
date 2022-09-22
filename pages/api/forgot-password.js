import mysql from "./mysql-connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
var nodeoutlook = require('nodejs-nodemailer-outlook');

export default function handler(req, res) {
    if(req.method=='GET'){
        res.status(404).json({ name: 'Error Page Not Found!' })
    }
    else{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        mysql.query(`update user set user_password = "${hash}", pin_code = "${Math.floor(1000 + Math.random() * 9000)}" where user_email = "${req.body.email}"`, (error, result)=>{
            if(error){
                console.log(error);
                res.send("Something went wrong!");
            }
            else{
                res.send("updated!");
            }
        })
    }
}