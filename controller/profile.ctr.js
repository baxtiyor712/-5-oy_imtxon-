const AuthSchema = require("../schema/auth.schema")
const BaseError = require("../error/baseError")
const bcrypt = require("bcryptjs")

const addProfileInfo = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body

    const foundedProfileOwner = await AuthSchema.findById(req.profileInfo.id)

    if (!foundedProfileOwner) {
        throw BaseError.UnAuthorized("Owner not found")
    }

    await AuthSchema.findByIdAndUpdate(req.profileInfo.id, {firstName, lastName, phoneNumber}, {new: true})

    res.status(201).json({
        message: "Successfully updated"
    })
    
  } catch (error) {
    next(error);
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { email, current_password, new_password, confirm_password } = req.body

    const foundedUser = await AuthSchema.findOne({email})

    if (!foundedUser) {
        throw BaseError.NotFoundException("User not found")
    }

    const decode = bcrypt.compare(current_password, foundedUser.password)

    if (!decode) {
        throw BaseError.UnAuthorized("Wrong current password")
    }

    if (new_password !== confirm_password) {
        throw BaseError.UnAuthorized("Wrong new or confirm password")
    }

    const hashPassword = await bcrypt.hash(new_password, 12)

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {password: hashPassword})
    
    res.status(201).json({
        message: "Successfully updated"
    })
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addProfileInfo,
  changePassword
}
