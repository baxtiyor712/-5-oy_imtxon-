const jwt = require("jsonwebtoken")
const BaseError = require("../error/baseError")
const { accessToken } = require("../utils/generate-token")

module.exports = function (req, res, next) {
    try{
        const refreshToken = req.cookies.refreshToken   

        if (!refreshToken) {
            throw BaseError.UnAuthorized("refresh token not found")
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
        req.user = decode

        const payload = {id: req.user._id, email: req.user.email, role: req.user.role} 
        const access = accessToken(payload)

        res.cookie("accessToken", access, {httpOnly: true, maxAge: 900000})

        res.json({
            token: access
        })
  
    }catch(error){
        throw new Error(error)
    }
}