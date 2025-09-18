const BaseError = require("../error/baseError");
const AuthSchema = require("../schema/auth.schema");
const bcrypt = require("bcryptjs")
const sendEmail = require("../utils/email-service")
const {accessToken, refreshToken} = require("../utils/generate-token")

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    const foundedUsername = await AuthSchema.findOne({username})

    if (foundedUsername) {
        throw BaseError.UnAuthorized("Username alredy exists")
    }

    const foundedUser = await AuthSchema.findOne({email})

    if (foundedUser) {
        throw BaseError.UnAuthorized("Email alredy exists")
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const otp = +Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join("")

    await AuthSchema.create({username, email, password: hashPassword, otp, otpTime: Date.now()})

    sendEmail(email, otp)

    res.status(201).json({
        message: "Registered"
    })
  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
    try{
        const {email, otp} = req.body

        const foundedUser = await AuthSchema.findOne({email})
        if (!foundedUser) {
            throw BaseError.UnAuthorized("User not found")
        }

        if((Date.now() - foundedUser.otpTime) > 120000) {
          throw BaseError.BadRequest("verification code was expired")

        }
        
        if (otp === foundedUser.otp) {
        await foundedUser.updateOne({isVerified: true, otp: null})
        }else{
           throw BaseError.BadRequest("verification code is wrong")
        }
        
        res.status(201).json({message: "Verified"})

    }catch(error){
        next(error);
    }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const foundedUser = await AuthSchema.findOne({email})

    if (!foundedUser) {
        throw BaseError.UnAuthorized("User not found")
    }

    const decode = await bcrypt.compare(password, foundedUser.password)

    if (decode) {
      const payload = {id: foundedUser._id, email: foundedUser.email, role: foundedUser.role}

            const access = accessToken(payload)
            const refresh = refreshToken(payload)

            res.cookie("accessToken", access, {httpOnly: true, maxAge: 15000 * 60})
            res.cookie("refreshToken", refresh, {httpOnly: true, maxAge: 1000 * 3600 * 24 * 15})


      res.status(200).json({
        message: "Success",
        access
      })
    }else{
      throw BaseError.UnAuthorized(" Wrong pasword ")
    }

  } catch (error) {
    next(error)
  }
}

const resendCode = async (req, res, next) => {
    try{
        const {email} = req.body

        const foundedUser = await AuthSchema.findOne({email})
        if (!foundedUser) {
            throw BaseError.UnAuthorized(" User not found ")
        }
        
        const otp = +Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join("")
        await foundedUser.updateOne({otp, otpTime: Date.now()})
        
        sendEmail(email, otp)
        
        res.status(200).json({
            message: " verification code sent "
        })
    }catch(error){
        next(error);
    }
}

const logout = async (req, res, next) => {
    try{
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        res.json({
          message: "Logged out"
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
  register,
  verify,
  login,
  resendCode,
  logout
}
