import express from "express";
import {
    listAllRestaurants,
  restaurantLogin,
  restaurentRegister,
} from "../controllers/restaurentUserCtrl.js";
import {
  createFoodproduct,
  deleteFoodItem,
  getAllFoodProduct,
  getFoodProduct,
  updateFoodItem,
} from "../controllers/restaurantFoodProduct.js";
import { restaurantOwnerIsLoggedIn } from "../middlewares/restaurantIsLoggedIn.js";

const restaurantUser = express.Router();

restaurantUser.post("/register", restaurentRegister);
restaurantUser.post("/login", restaurantLogin);
restaurantUser.post(
  "/create/food",
  restaurantOwnerIsLoggedIn,
  createFoodproduct
);
restaurantUser.get("/get/food/:id", getFoodProduct);

//!get  particular restaurant id food
restaurantUser.get(
  "/get-restaurant-food/:id",
  restaurantOwnerIsLoggedIn,
  getAllFoodProduct
);

//?update particular restaurant id food
restaurantUser.put(
  "/update-food/:foodId",
  restaurantOwnerIsLoggedIn,
  updateFoodItem
);

//* Delete the food item
restaurantUser.delete(
  "/delete-food/:foodId",
  restaurantOwnerIsLoggedIn,
  deleteFoodItem
);


//* List All restaurant for customers
restaurantUser.get(
  "/list-names",
  listAllRestaurants
);

export default restaurantUser;
