const { Schema, model } = require("mongoose");

const Brand = new Schema({
    name: {
        type: String,
        allowNull: [false, "Brand nomi bo'sh bolmasligi kerak"],
        minlength: [3, "Brand nomi kamida 3-ta harf bolishi kerak"]
    },
    image: {
        type: String,
        allowNull: [false, "rasm bolishi kerak"]
    },
    addedBy: {
        type: String,
        allowNull: false
    }
},
{
    versionKey: false,
    timestamps: true
}
)

const BrandSchema = model("Brand", Brand)
module.exports = BrandSchema