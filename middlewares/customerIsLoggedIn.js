import jwt from "jsonwebtoken";
import Customer from "../models/CustomerUserSchema.js";

export const customerIsLoggedIn = async (req, res, next) => {
  const token = getTokenFromHeader(req);

  try {
    const decodedUser = jwt.verify(token, process.env.JWT);
    console.log("Decoded User: ", decodedUser);
    // Verify the user's role from the decoded token
    if (decodedUser.role.toLowerCase() !== "customer") {
      throw new Error("Access denied. Only customers are allowed.");
    }

    // Save the user ID into req object for further processing
    req.user = { _id: decodedUser.customerId };
    next();
  } catch (error) {
    console.error("Middlewear Error:", error);
    res.status(401).json({ error: error.message });
  }
};

export const getTokenFromHeader = (req) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and has the correct format
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token part from the header
    const token = authHeader.substring(7); // Remove 'Bearer ' from the beginning
    console.log("Token", token);
    return token;
  }

  // If the header is missing or has incorrect format, return null or handle the error accordingly
  console.log("Token not found in header");
  return null;
};
