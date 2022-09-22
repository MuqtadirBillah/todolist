import mysql from "../mysql-connection";
const moment = require("moment");

export default function handler(req, res) {
    if(req.method=="GET"){
        res.status(404).json(`Page not found!`)
    }
    else if(req.method=="POST"){
        mysql.query(`select * from task where task_id = "${req.body.taskId}"`, function(error, result){
            if(error){
                console.log(error)
                res.send("Something went wrong!");
            }
            else{
                console.log(result)
                if(result[0].task_status.toLowerCase()=='pending'){
                    mysql.query(`update task set task_status = "completed" where task_id = "${req.body.taskId}"`, function(err, re){
                        if(err){
                            console.log(err);
                            res.send(err);
                        }
                        else{
                            console.log(re)
                            res.send('updated!');
                        }
                    })
                }
                if(result[0].task_status.toLowerCase()=='completed'){
                    mysql.query(`update task set task_status = "pending" where task_id = "${req.body.taskId}"`, function(err, re){
                        if(err){
                            console.log(err);
                            res.send(err);
                        }
                        else{
                            console.log(re)
                            res.send('updated!');
                        }
                    })
                }
            }
        })
        mysql.end();
    }
}
  