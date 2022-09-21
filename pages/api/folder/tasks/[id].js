import verifyToken from "../../verifyToken";
import mysql from "../../mysql-connection";

export default function handler(req, res) {
    const {id} = req.query
    if(req.method=='GET'){
        console.log(req.headers);
        verifyToken(req.headers.token)
        .then((response)=>{
            console.log(response);
            mysql.query(`select * from userfolder where user_id="${response.id}" and folder_id="${id}"`, function(error, result){
                if(error){
                    console.log(error);
                    res.send(`Something went wrong!`);
                }
                else{
                    console.log(result);
                    if(result.length>0){
                        mysql.query(`select * from foldertask as ft inner join task as t on t.task_id=ft.task_id where ft.folder_id="${id}";`, function(err, re){
                            if(err){
                                console.log(err);
                                res.send(err);
                            }
                            else{
                                if(re.length>0){
                                    res.send(re);
                                }
                                else{
                                    res.send("record not found!");
                                }
                            }
                        })
                    }
                    else{
                        res.send("Unauthorized user!");
                    }
                }
            })
        })
        .catch((err)=>{
            console.log(err);
            res.send(err);
        })
    }
    else if(req.method=='POST'){
        res.status(404).json(`Page not found!`);
    }
}
  