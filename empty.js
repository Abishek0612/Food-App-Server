// import mongoose from "mongoose";
// const Schema  = mongoose.model

// const RestaurentSchema = mongoose.Schema({

//     restaurantName: {
//         type: String,
//         required: true
//     } ,


//     password:{
//         type:String,
//         required:true
//     },

//     address: {
//         type: String,
//         required: true
//     },

//     openingTime: {
//         type: String,
//         required: true
//     },
//     closingTime: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         default: 'restaurantOwner' // Set default role for restaurant owners
//      }

// })


// const Restaurent = mongoose.model("RestaurantUser", RestaurentSchema)

// export default Restaurent                                                                                                                                                         import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const FoodProductSchema = new Schema(
//   {
//     itemName: {
//       type: String,
//       required: true,
//     },

  

//     price: {
//       type: Number,
//       required: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     picture: {
//       type: String,
//       required: false,
//     },

//     totalQty: {
//       type: Number,
//       required: true,
//     },

//     totalSold: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     restaurant:{
//       type: Schema.Types.ObjectId,
//       ref: "RestaurantUser",
//       required: false
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// const FoodProduct = mongoose.model("FoodProduct", FoodProductSchema);

// export default FoodProduct;
// this is my Schema                                                                                                                                                                         import jwt from 'jsonwebtoken';
// import Restaurent from '../models/RestaurentUserSchema.js';

//     export const restaurantOwnerIsLoggedIn = async (req, res, next) => {
//         const token = getTokenFromHeader(req);
    
//         try {
//             const decodedUser = jwt.verify(token, process.env.JWT);
//             console.log('Decoded User:', decodedUser);
    
//             // Verify the user's role from the decoded token
//             if (decodedUser.role.toLowerCase() !== 'restaurantowner') {
//                 throw new Error('Access denied. Only restaurant owners are allowed.');
//             }
    
//             // Save the user ID into req object for further processing
//             req.user = { _id: decodedUser.restaurantId };
//             next();
//         } catch (error) {
//             console.error('Middleware Error:', error);
//             res.status(401).json({ error: error.message });
//         }
//     };
    

// export const getTokenFromHeader = (req) => {
//     // Get the Authorization header
//     const authHeader = req.headers.authorization;

//     // Check if the Authorization header exists and has the correct format
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//         // Extract the token part from the header
//         const token = authHeader.substring(7); // Remove 'Bearer ' from the beginning
//         console.log('Token:', token);
//         return token;
//     }

//     // If the header is missing or has incorrect format, return null or handle the error accordingly
//     console.log('Token not found in header');
//     return null;
// };
// this is middleware                                                                                                                                                                         import FoodProduct from '../models/FoodProductSchema.js';
// import RestaurantUser from '../models/RestaurentUserSchema.js';

// const createFoodproduct = async (req, res) => {
//   try {
//     const { itemName, price, description, picture, totalQty } = req.body;
//     const { restaurantName } = req.user; // Assuming restaurant owner's name is stored in req.user from authentication middleware

//     const restaurant = await RestaurantUser.findOne({ restaurantName });
//     if (!restaurant) {
//       return res.status(404).json({ error: 'Restaurant owner not found' });
//     }

//     const foodProduct = new FoodProduct({
//       itemName,
//       price,
//       description,
//       picture,
//       totalQty,
//       restaurant: restaurant._id, // Associate the food item with the restaurant owner
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     await foodProduct.save();
//     res.status(201).json({ message: 'Food product created successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export { createFoodproduct };
// this is the controller for creating a food . i create a food     this is my payload  {
//     "itemName" :"Fried rice",
//       "price":  100,
//        "description":"Steamed rice", 
//          "totalQty":5
//          }                                                                                                                                                                                                                                                                                            in console  getting like this    Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOiI2NTI5NTdiYjI1N2QzMzBkNmQ0NDAxMzYiLCJyb2xlIjoicmVzdGF1cmFudE93bmVyIiwiaWF0IjoxNjk3MjA4NDg2LCJleHAiOjE2OTcyOTQ4ODZ9.SUQEx7VwNpnBh29nQPPocVIquICCn8hP07tGTlZ9Iu8
// Decoded User: {
//   restaurantId: '652957bb257d330d6d440136',
//   role: 'restaurantOwner',
//   iat: 1697208486,
//   exp: 1697294886
// }. passing the token but getting like this    in postman  {
//     "error": "Restaurant owner not found"
// }