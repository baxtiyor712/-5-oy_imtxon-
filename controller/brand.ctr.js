const BaseError = require("../error/baseError");
const BrandSchema = require("../schema/brand.schema");

const getAllBrands = async (req, res, next) => {
    try{
        const brands = await BrandSchema.find()

        res.status(200).json(brands)
    }catch(error){
        next(error)
    }
}

const addBrand = async (req, res, next) => {
    try{
        const {name, image} = req.body

        await BrandSchema.create({name, image, addedBy: req.user.id})

        res.status(201).json({
            message: "Added new brand"
        })

    }catch(error){
        next(error)
    }
}

const getOneBrand = async (req, res, next) => {
    try{
        const {id} = req.params

       const foundedBrand = await BrandSchema.findById(id)
       if (!foundedBrand) {
        throw BaseError.UnAuthorized("Brand not found")
       }

       res.status(200).json(foundedBrand)
    }catch(error){
        next(error)
    }
}

const updateBrand = async (req, res, next) => {
    try{
        const {name, image} = req.body

        const {id} = req.params

       const foundedBrand = await BrandSchema.findById(id)
       if (!foundedBrand) {
        throw BaseError.UnAuthorized("Brand not found")
       }

       await BrandSchema.findByIdAndUpdate(id, {name, image, addedBy: req.user.id}, {new: true})

       res.status(201).json({
        message: "Brand updated"
       })
    }catch(error){
        next(error)
    }
}

const deleteBrand = async (req, res, next) => {
    try{
        const {id} = req.params

       const foundedBrand = await BrandSchema.findById(id)
       if (!foundedBrand) {
        throw BaseError.UnAuthorized("Brand not found")
       }

       await BrandSchema.findByIdAndDelete(id)

       res.status(201).json({
        message: "Brand deleted"
       })
    }catch(error){
        next(error)
    }
}

module.exports = {
    getAllBrands,
    getOneBrand,
    addBrand,
    updateBrand,
    deleteBrand
}