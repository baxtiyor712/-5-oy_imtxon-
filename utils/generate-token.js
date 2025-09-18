const jwt = require("jsonwebtoken")

const accessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, {expiresIn: "13m"})
}

const refreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn: "15d"})
}

module.exports = {
    accessToken,
    refreshToken
}