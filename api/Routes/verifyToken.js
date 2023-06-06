const jwt = require("jsonwebtoken")


//This whole verification is done for jwt token to verify the change is done either by the same user in his id or the admin and no one else can have right to change anything 
//To see the example watch https://www.youtube.com/watch?v=rMiRZ1iRC0A&list=PLj-4DlPRT48mxPG8TAXOH4qqQ1ijuERO4&index=2
//at 1:06:00 to 2 min

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token 
    if(authHeader)   
    {
        const token = authHeader.split(' ')[1]
        jwt.verify(token,process.env.JWT_SEC_KEY,(err,user)=>{
            if(err)
            res.status(403).json("Token is not valid!")

            req.user = user
            next();
        })

    }else{
        return res.status(401).json("You are not authenticated!")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allow to do that!")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allow to do that!")
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}