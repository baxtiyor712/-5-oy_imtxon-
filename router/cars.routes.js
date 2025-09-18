const Router = require("express")
const { getAllCars, getOneCar, addCar, updateCar, deleteCar } = require("../controller/cars.ctr")
const customValidatorMiddleware = require("../middleware/cars.validate.middleware")
const accessTokenMiddleware = require("../middleware/accessToken.middleware")

const carRouter = Router()

carRouter.get("/get_all_cars", getAllCars)
carRouter.get("/get_one_car/:id", getOneCar)
carRouter.post("/add_car", accessTokenMiddleware, addCar)
carRouter.put("/update_car/:id", accessTokenMiddleware, updateCar)
carRouter.delete("/delete_car/:id", accessTokenMiddleware, deleteCar)

module.exports = carRouter