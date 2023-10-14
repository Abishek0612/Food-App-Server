import FoodProduct from "../models/FoodProductSchema.js";
import RestaurantUser from "../models/RestaurentUserSchema.js";

const createFoodproduct = async (req, res) => {
  try {
    const { itemName, price, description, picture, totalQty } = req.body;
    const { _id: restaurantId } = req.user;

    const restaurant = await RestaurantUser.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        error: "Your not the restaurant owner to perform this operation",
      });
    }

    const foodProduct = new FoodProduct({
      itemName,
      price,
      description,
      picture,
      totalQty,
      restaurant: restaurant._id,
    });

    await foodProduct.save();
    res.status(201).json({
      message: "Food product created successfully!",
      foodProduct: foodProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Single food product using id
const getFoodProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const foodProduct = await FoodProduct.findById(id).populate(
      "restaurant",
      "restaurantName"
    );

    if (!foodProduct) {
      return res.status(400).json({ error: "Food product not found" });
    }

    res.status(200).json({
      message: "Successfully fetched single food item",
      foodProduct: foodProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! Get all food product of a  particular restaurant id
const getAllFoodProduct = async (req, res) => {
  try {
    const restaurantOwnerId = req.user._id;

    // Find all food products associated with this restaurant owner
    const foodProducts = await FoodProduct.find({
      restaurant: restaurantOwnerId,
    });
    if (!foodProducts.length === 0) {
      return res
        .status(400)
        .json({ error: "No food products found for this restaurant" });
    }

    res.status(200).json({
      message: "Successfully fetched food items",
      foodProducts: foodProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//? only particular restaurant owner can Update the food
const updateFoodItem = async (req, res) => {
  try {
    const restaurantOwnerId = req.user._id;
    const foodProductId = req.params.foodId; // Assuming you pass foodId as a route parameter
    const updateData = req.body; // New data to update the food item with

    //!Find the food product by ID and ensure it belongs to this restaurant owner
    const foodProduct = await FoodProduct.findById(foodProductId);

    if (!foodProduct) {
      return res.status(400).json({ error: " food product not found " });
    }

    if (foodProduct.restaurant.toString() !== restaurantOwnerId.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this food item" });
    }

    //! Update the food product
    for (let key in updateData) {
      foodProduct[key] = updateData[key];
    }

    await foodProduct.save();

    res.status(200).json({
      message: "Food product updated successfully!",
      foodProduct: foodProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* only particular restaurant owner can delete  there food product

const deleteFoodItem = async (req, res) => {
  try {
    const restaurantOwnerId = req.user._id;
    const foodProductId = req.params.foodId;

    const foodProduct = await FoodProduct.findById(foodProductId);

    if (!foodProduct) {
      return res.status(400).json({ error: " food product not found " });
    }

     // Check if the food product belongs to the restaurant owner making the request
    if(foodProduct.restaurant.toString() !==restaurantOwnerId.toString()){
      return res.status(403).json({ error: "Not authorized to delete this food item" });
    }

    // Proceed with the deletion
    await FoodProduct.findByIdAndDelete(foodProductId)

    res
      .status(200)
      .json({
        message: "Food Item deleted successfully",
        foodProduct: foodProduct,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createFoodproduct, getFoodProduct, getAllFoodProduct, updateFoodItem , deleteFoodItem};
