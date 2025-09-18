const Router = require("express")
const { getAllBrands, getOneBrand, addBrand, updateBrand, deleteBrand } = require("../controller/brand.ctr")
const accessTokenMiddleware = require("../middleware/accessToken.middleware")

const brandRouter = Router()

brandRouter.get("/get_all_brands", getAllBrands)
brandRouter.get("/get_one_brand/:id", getOneBrand)
brandRouter.delete("/delete_brand/:id", accessTokenMiddleware, deleteBrand)
brandRouter.post("/add_brand",accessTokenMiddleware, addBrand)
brandRouter.put("/update_brand/:id", accessTokenMiddleware, updateBrand)

module.exports = brandRouter