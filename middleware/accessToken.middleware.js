const jwt = require("jsonwebtoken")
const BaseError = require("../error/baseError")

module.exports = function(req, res, next){
    try{
        const token = req.cookies.accessToken


        if (!token) {
            throw BaseError.UnAuthorized("Access token not found")
        }

        
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = decode

        if (req.user.role !== "admin") {
           throw BaseError.ForbiddenException("You ar not Admin!")
        }



        next()
        
    }catch(error){
        throw new Error(error)
    }
}