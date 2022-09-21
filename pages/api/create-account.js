import mysql from "./mysql-connection";
import moment from "moment";
var bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    if(req.method=='GET'){
        res.status(404).json('Page not found!')
    }
    else if(req.method=='POST'){
        var salt = bcrypt.genSaltSync(10);
        var passwordHash = bcrypt.hashSync(req.body.password, salt);
        mysql.query(`insert into user(user_email, user_first_name, user_last_name, user_password, pin_code, creation_date) values("${req.body.email}", "${req.body.fname}", "${req.body.lname}", "${passwordHash}", "${Math.floor(1000 + Math.random() * 9000)}", "${moment().format("MMMM Do YYYY, h:mm:ss a")}")`, function (error, results, fields) {
            if(error){
                console.log(error);
                console.log(error.errno);
                if(error.errno=='1062'){
                    res.send("Email Address already exists!")
                }
                else{
                    res.send('Something went wrong!');
                }
            }
            else{
                res.send('registered!');
            }
        })
        mysql.end();
    }
}
  