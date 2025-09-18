const { Schema, model } = require("mongoose");

const Car = new Schema({
    brandId: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        allowNull: false
    },
    title: {
        type: String,
        allowNull: [false, "Mashina nomi bolish  kerak"],
        minLength: [3, "Mashina nomi kamida 3-ta harf bolishi kerak"]
    },
    tanirofka: {
        type: String,
        allowNull: false
    },
    price: {
       type: Number,
       allowNull: false
   },
     motor: {
        type: String,
        allowNull: false
    },
     year: {
        type: Number,
        allowNull: false
    },
     color: {
        type: String,
        allowNull: false
    },
     distance: {
        type: String,
        allowNull: false
    },
     gearBook: {
        type: String,
        allowNull: false
    },
     deseription: {
        type: String,
        allowNull: false
    },
     image: {
        type: String,
        allowNull: false
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

const CarSchema = model("Car", Car)
module.exports = CarSchema