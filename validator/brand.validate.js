const joi = require("joi")

module.exports = function customValidator(data) {
    try{
        const validate = joi.object({
            name: joi.string().min(3).max(50).required(),
            image: joi.string().required()
        })
        return validate.validate(data)
    }catch(error){
        throw new Error(error.message)
    }
}