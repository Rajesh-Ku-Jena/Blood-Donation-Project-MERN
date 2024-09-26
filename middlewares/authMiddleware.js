const JWT= require('jsonwebtoken')

module.exports= async(req, resp, next)=>{
    try {
        const token= req.headers['authorization'].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                return resp.status(401).send({
                    success: false,
                    message:'Auth failed'
                })
            }else{
                req.body.userId= decode.userId
                next();
            }
        })
    } catch (error) {
        console.log(error);
        return resp.status(400).send({
            success: false,
            message:'Invalid Authentication'
        })
        
    }
}