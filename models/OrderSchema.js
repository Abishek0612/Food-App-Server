import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerUser",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantUser",
      required: true,
    },

    items: [
      {
        foodProduct: {
          type: Schema.Types.ObjectId,
          ref: "FoodProduct",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processed", "Shipped", "Delivered"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: false,
      enum: ["Credit Card", "Debit Card", "Paypal", "Cash"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
