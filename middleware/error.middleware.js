const BaseError = require("../error/baseError")

module.exports = function(err, req, res, next) {
    try{
        if(err instanceof BaseError){
            return res.status(err.status).json({message: err.message, errors: err.errors})
        }

        if(err.name === "ValidationError"){
            const errorDetails = Object.values(err.errors).map((e) => e.message)
            return res.status(400).json({message: err.message, errors: errorDetails})
        }

        
        if(err.name === "Error"){
            const errorDetails = Object.values(err.errors).map((e) => e.message)
            return res.status(400).json({message: err.message, errors: errorDetails})
        }

        if(err.name === "JsonWebTokenError"){
            const errorDetails = Object.values(err.errors).map((e) => e.message)
            return res.status(400).json({message: err.message, errors: errorDetails})
        }

        return res.json({message: err.message})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}