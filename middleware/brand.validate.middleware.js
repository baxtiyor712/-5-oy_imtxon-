const BaseError = require("../error/baseError")
const customValidator = require("../validator/brand.validate")

module.exports = function customValidatorMiddleware(req, res, next) {
    try{
        const {error} = customValidator(req.body)

        if (error) {
           throw BaseError.BadRequest(error.message)
        }

        next()
    }catch(error){
        throw new Error(error)
    }
}