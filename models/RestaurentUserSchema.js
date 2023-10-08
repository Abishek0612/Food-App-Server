import mongoose from "mongoose";
const Schema  = mongoose.model

const RestaurentSchema = mongoose.Schema({

    restaurantName: {
        type: String,
        required: true
    } ,

    address: {
        type: String,
        required: true
    },

    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    }

})


const Restaurent = mongoose.model("Restaurant ", RestaurentSchema)

export default Restaurent