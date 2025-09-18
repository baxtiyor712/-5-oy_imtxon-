const { Schema, model } = require("mongoose");

const Auth = new Schema({
    username: {
        type: String,
        allowNull: [false, "username bosh bolmasligi kerak"],
        minLength: [3, "username kamida 3-ta harf bolishi kerak"]
    },
    email: {
        type: String,
        allowNull: false,
        validate: {
            validator: function(value){
                return /^\S+@\S+\.\S+$/.test(value)
            },
            message: "Emailni tog'ri kiritish kerak"
        }
    },
    password: {
        type: String,
        allowNull: false
    },
    firstName: {
        type: String,
        allowNull: true,
        default: null
    },
    lastName: {
        type: String,
        allowNull: true,
        default: null
    },
    phoneNumber: {
        type: String,
        allowNull: true,
        default: "0"
    },
    role: {
        type: String,
        allowNull: true,
        default: "user"
    },
     otp: {
        type: Number,
        allowNull: true,
        default: 0
    },
     isVerified: {
        type: Boolean,
        allowNull: true,
        default: false
    },
     otpTime: {
        type: Number,
        allowNull: false
    }
},
{
    versionKey: false,
    timestamps: true
}
)

const AuthSchema = model("Auth", Auth)
module.exports = AuthSchema