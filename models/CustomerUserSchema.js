import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phoneNumber: {
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

    hasShippingAddress:{
      type:Boolean,
      default: false
    },

    shippingAddress:{
      name:{
        type:String,
      },
      address:{
        type:String
      }
    }
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("CustomerUser", CustomerSchema);

export default Customer;
