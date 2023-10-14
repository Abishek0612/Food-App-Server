import mongoose from "mongoose";
const Schema = mongoose.model;

const RestaurentSchema = mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "restaurantOwner", // Set default role for restaurant owners
  },
});

const Restaurent = mongoose.model("RestaurantUser", RestaurentSchema);

export default Restaurent;
