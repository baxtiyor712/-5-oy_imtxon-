const BaseError = require("../error/baseError");
const CarSchema = require("../schema/cars.schema");

const getAllCars = async (req, res, next) => {
    try{
        const cars = await CarSchema.find().populate("brandId", "-_id")

        res.status(200).json(cars)
    }catch(error){
        next(error)
    }
}

const addCar = async (req, res, next) => {
    try{
        const {brandId, title, tanirofka, price, motor, year, color, distance, gearBook, deseription, image} = req.body

        await CarSchema.create({brandId, title, tanirofka, price, motor, year, color, distance, gearBook, deseription, image, addedBy: req.user.id})

        res.status(201).json({
            message: "Added new car"
        })
    }catch(error){
        next(error)
    }
}

const getOneCar = async (req, res, next) => {
    try{
        const {id} = req.params

        const foundedCar = await CarSchema.findById(id)

        if (!foundedCar) {
            throw new BaseError.UnAuthorized("Car not found")
        }

        res.status(200).json(foundedCar)
    }catch(error){
        next(error)
    }
}

const updateCar = async (req, res, next) => {
    try{
       const {brandId, title, tanirofka, price, motor, year, color, distance, gearBook, deseription, image} = req.body

       const {id} = req.params

        const foundedCar = await CarSchema.findById(id)

        if (!foundedCar) {
            throw new BaseError.UnAuthorized("Car not found")
        }

        await CarSchema.findByIdAndUpdate(id, {brandId, title, tanirofka, price, motor, year, color, distance, gearBook, deseription, image, addedBy: req.user.id}, {new: true})

        res.status(201).json({
            message: "Car updated"
        })
    }catch(error){
        next(error)
    }
}

const deleteCar = async (req, res, next) => {
    try{
        const {id} = req.params

        const foundedCar = await CarSchema.findById(id)

        if (!foundedCar) {
            throw new BaseError.UnAuthorized("Car not found")
        }

        await CarSchema.findByIdAndDelete(id)

        res.status(201).json({
            message: "Car deleted"
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    getAllCars,
    getOneCar,
    addCar,
    updateCar,
    deleteCar
}