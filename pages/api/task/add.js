import mysql from "../mysql-connection";
const moment = require("moment");

export default function handler(req, res) {
    if(req.method=="GET"){
        res.status(404).json(`Page not found!`)
    }
    else if(req.method=="POST"){
        console.log(req.body)
        mysql.query(`insert into task(task_name, creation_date) values("${req.body.task}", "${moment().format("MMMM Do YYYY, h:mm:ss a")}")`, function(error, result){
            if(error){
                console.log(error)
                res.send("Something went wrong!");
            }
            else{
                console.log(result)
                mysql.query(`insert into foldertask(folder_id, task_id) values("${req.body.folderId}", "${result.insertId}")`, function(err, re){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else{
                        console.log(re)
                        res.send('added!');
                    }
                })
            }
        })
        mysql.end();
    }
}
  