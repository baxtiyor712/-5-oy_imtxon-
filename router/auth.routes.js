const {Router} = require("express")
const { register, verify, login, resendCode, logout } = require("../controller/auth.ctr")
const refreshTokenMiddleware = require("../middleware/refreshToken.middleware")

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.get("/logout", logout)
authRouter.post("/resend_code", resendCode)
authRouter.get("/refresh", refreshTokenMiddleware)

module.exports = authRouter