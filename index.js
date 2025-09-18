const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
require("dotenv").config()
const brandRouter = require("./router/brand.routes")
const carRouter = require("./router/cars.routes")
const errorMiddleware = require("./middleware/error.middleware")
const authRouter = require("./router/auth.routes")
const cookieParser = require("cookie-parser")
const logger = require("./utils/logger")
const profileRouter = require("./router/profile.routes")

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(cookieParser())

connectDB()

// logger.log("Console logger")
// logger.error("Error logger")
// logger.warn("Warning logger")
// logger.info("Info logger")
// logger.debug("Debug logger")

// router
app.use(brandRouter)
app.use(carRouter)
app.use(authRouter)
app.use(profileRouter)

//middleware
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running at: ${PORT}`);
})