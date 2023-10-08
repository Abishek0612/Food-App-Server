import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FoodProductSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    picture: {
      type: String,
      required: false,
    },

    totalQty: {
      type: Number,
      required: true,
    },

    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const FoodProduct = mongose.model("FoodProduct", FoodProductSchema);

export default FoodProduct;
