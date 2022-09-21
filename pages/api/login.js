import mysql from "./mysql-connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if(req.method=='GET'){
        res.status(404).json({ name: 'Error Page Not Found!' })
    }
    else{
        if(req.body.email!='' || req.body.password!=''){
            mysql.query(`select * from user where user_email='${req.body.email.toLowerCase()}'`, function (error, results, fields) {
                if(error){
                    // throw error;
                    console.log(error)
                }
                else{
                    if(results.length<1){
                        console.log('Email not found!');
                        res.send('Invalid credentials')
                    }
                    else{
                        if(bcrypt.compareSync(req.body.password, results[0].user_password)){
                            console.log('password matched!')
                            var token = jwt.sign({ email: results[0].user_email, role: results[0].user_role, id: results[0].user_id, first_name: results[0].first_name, last_name: results[0].last_name }, process.env.JWTSecret);
                            res.status(200).json({statuss: 'Logged In!', email: results[0].user_email, role: results[0].user_role, id: results[0].user_id, first_name: results[0].first_name, last_name: results[0].last_name, jwt: token})
                        }
                        else{
                            res.send('Invalid credentials')
                        }
                    }
                }
            });
            mysql.end();
        }
    }
}