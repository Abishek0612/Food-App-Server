import Restaurent from "../models/RestaurentUserSchema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const restaurentRegister = async (req, res) => {
  try {
    const {
      restaurantName,
      email,
      address,
      password,
      openingTime,
      closingTime,
    } = req.body;

    //! Check if the restaurant with the given restaurantName already exists
    const existingRestaurant = await Restaurent.findOne({ restaurantName });
    if (existingRestaurant) {
      return res
        .status(400)
        .json({ error: " Restaurent with this name already exist" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const restaurant = await Restaurent({
      restaurantName,
      email,
      address,
      password: hashedPassword,
      openingTime,
      closingTime,
    });

    await restaurant.save();
    res.status(201).json({
      restaurantName,
      email,
      address,
      openingTime,
      closingTime,
      message: "Restaurent Registered successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ! LOGIN
const restaurantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const restaurant = await Restaurent.findOne({ email });

    if (!restaurant) {
      return res
        .status(401)
        .json({ error: "Invalid restaurant name or password" });
    }

    const passwordMatch = await bcrypt.compare(password, restaurant.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid restaurant name or password" });
    }

    const token = Jwt.sign(
      { restaurantId: restaurant._id, role: "restaurantOwner" },
      process.env.JWT,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token, email, restaurantId: restaurant._id ,  restaurantName: restaurant.restaurantName});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//! Listing all restaurant for customers

export const listAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurent.find({}, { password: 0, email: 0 , role:0, _id:0});
    res.status(200).json({
      message: "Restaurants successfully Fetched",
      restaurants: restaurants,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { restaurentRegister, restaurantLogin };
