const nodemailer = require("nodemailer")

module.exports = async function sendEmail(email, otp){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "baxtiyorrajabboyev013@gmail.com",
            pass: process.env.APP_KEY
        }
    })

    const result = await transporter.sendMail({
        from: "baxtiyorrajabboyev013@gmail.com",
        to: email,
        text: "salom",
        subject: "Library auth",
        html: `<h1 style="font-size: 36px; color: blue;">${otp}</h1>`
    })
}