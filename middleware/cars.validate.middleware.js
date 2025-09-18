const BaseError = require("../error/baseError")
const customValidatorCar = require("../validator/cars.validate")

module.exports = function customValidatorMiddleware(req, res, next) {
    try{
        const {error} = customValidatorCar(req.body)

        if (error) {
            throw BaseError.BadRequest(error.message)
        }

        next()
    }catch(error) {
        throw new Error(error)
    }
}