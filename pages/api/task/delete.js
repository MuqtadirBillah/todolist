import mysql from "../mysql-connection";
const moment = require("moment");

export default function handler(req, res) {
    if(req.method=="GET"){
        res.status(404).json(`Page not found!`)
    }
    else if(req.method=="POST"){
        mysql.query(`delete from foldertask where task_id = "${req.body.taskId}"`, function(error, result){
            if(error){
                console.log(error)
                res.send("Something went wrong!");
            }
            else{
                console.log(result)
                mysql.query(`delete from task where task_id = "${req.body.taskId}"`, function(err, re){
                    if(err){
                        console.log(err);
                        res.send(err);
                    }
                    else{
                        console.log(re)
                        res.send('deleted!');
                    }
                })
            }
        })
        mysql.end();
    }
}
  