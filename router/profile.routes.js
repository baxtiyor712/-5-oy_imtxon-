const Router = require("express")
const { addProfileInfo, changePassword } = require("../controller/profile.ctr")
const authorizationMiddlware = require("../middleware/authorization.middlware")

const profileRouter = Router()

profileRouter.patch("/add_profile_info", authorizationMiddlware, addProfileInfo)
profileRouter.patch("/change_passwod", authorizationMiddlware, changePassword)

module.exports = profileRouter