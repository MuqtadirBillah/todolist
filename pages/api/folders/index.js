var verifyToken = require("../verifyToken");
import mysql from "../mysql-connection";

export default function handler(req, res) {
    if(req.method=='GET'){
        verifyToken(req.headers.token)
        .then((response)=>{
            console.log(response)
            mysql.query(`select f.folder_id, f.folder_name, f.folder_description from userfolder as uf inner join folder as f on f.folder_id=uf.folder_id where uf.user_id="${response.id}"`, function (error, result, field) {
                if(error){
                    res.send(`Something went wrong!`);
                }
                else{
                    if(result.length>0){
                        res.send(result);
                    }
                    else{
                        res.send('record not found!');
                    }
                }
            })
            mysql.end();
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    else if(req.method=='POST'){
        res.status(404).json(`Page not found!`);
    }
}
  