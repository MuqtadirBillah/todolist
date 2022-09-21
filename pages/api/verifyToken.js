import jwt from "jsonwebtoken";

module.exports = function verifyToken(token){
    return new Promise(function(resolve, reject){
        console.log(token)
        if(token!=undefined){
            jwt.verify(token, process.env.JWTSecret, function(err, decoded) {
                if(decoded!=undefined){
                    // res.send(decoded)
                    resolve(decoded);
                }
                else{
                    // res.send('Invalid Token!')
                    reject(`Invalid Token!`);
                }
            });
        }
        else{
            // res.send('Invalid Token!');
            reject(`Invalid Token!`);
        }
    })
}