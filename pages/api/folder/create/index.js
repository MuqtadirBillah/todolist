import mysql from "../../mysql-connection";
import moment from "moment";
var bcrypt = require('bcryptjs');
import verifyToken from "../../verifyToken";

export default async function handler(req, res) {
    if(req.method=='GET'){
        res.status(404).json('Page not found!')
    }
    else if(req.method=='POST'){
        verifyToken(req.headers.token)
        .then(response=>{
            mysql.query(`insert into folder(folder_name, creation_date) values("${req.body.name}", "${moment().format("MMMM Do YYYY, h:mm:ss a")}")`, function (error, results, fields) {
                if(error){
                    console.log(error);
                    res.send('Something went wrong!');
                }
                else{
                    console.log(fields)
                    console.log(results)
                    mysql.query(`insert into userfolder(folder_id, user_id) values("${results.insertId}", "${response.id}")`, function (err, result, field) {
                        if(err){
                            console.log(err);
                            res.send('Something went wrong!');
                        }
                        else{
                            console.log(result)
                            res.send("created!");
                        }
                    })
                }
            })
            mysql.end();
        })
        .catch(err=>{
            console.log(err)
            res.send(`Something went wrong!`);
        })
    }
}
  