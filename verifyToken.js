const jwt = require('jsonwebtoken');

function verifyToken(req){
    return new Promise((resolve,reject)=>{
        if(req.headers && req,headers.authorization){
            let tok = req.headers.authorization;
            let decoded
            try{
                decoded = jwt.verify(tok,"secret");
            }
            catch(e){
                reject("Token not valid")
            }
            let userId =  decoded._id
            
        }
    })
}
  

module.exports = verifyToken