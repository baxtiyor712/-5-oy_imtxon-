const joi = require("joi")

module.exports = function customValidatorCar(data) {
    try{
        const validate = joi.object({
            brandId: joi.string().required(),
            title: joi.string().min(3).max(60).required(),
            price: joi.number().required(),
            tanirofka: joi.string().required(),
            motor: joi.string().required(),
            year: joi.number().required(),
            color: joi.string().required(),
            distance: joi.string().required(),
            gearBook: joi.string().required(),
            deseription: joi.string().min(10).required(),
            image: joi.string().required()
        })
        return validate.validate(data)
    }catch(error){
        throw new Error(error.message)
    }
}