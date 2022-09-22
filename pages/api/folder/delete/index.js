import mysql from "../../mysql-connection";
import moment from "moment";
var bcrypt = require('bcryptjs');
import verifyToken from "../../verifyToken";

export default async function handler(req, res) {
    if(req.method=='GET'){
        res.status(404).json('Page not found!')
    }
    else if(req.method=='POST'){
        console.log(req.body)
        verifyToken(req.headers.token)
        .then(response=>{
            mysql.query(`delete from userfolder where folder_id = "${req.body.folderId}"`, function (error, results, fields) {
                if(error){
                    console.log(error);
                    res.send('Something went wrong!');
                }
                else{
                    console.log(results)
                    mysql.query(`delete from folder where folder_id = "${req.body.folderId}"`, function (err, result, field) {
                        if(err){
                            console.log(err);
                            res.send('Something went wrong!');
                        }
                        else{
                            console.log(result)
                            res.send("deleted!");
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
  