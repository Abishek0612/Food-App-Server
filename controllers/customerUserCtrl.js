import Jwt from "jsonwebtoken";
import Customer from "../models/CustomerUserSchema.js";
import bcrypt from "bcryptjs";

const customerRegister = async (req, res) => {
  try {
    const { name, phoneNumber, email, password } = req.body;

    //! Check if the customer with the given email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      res
        .status(401)
        .json({ error: "Customer with this email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    }); 
    await customer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const customerLogin = async (req, res) => {
  try {
    const { email: inputEmail, password } = req.body;

    const customer = await Customer.findOne({ email: inputEmail }); // Use the renamed variable here

    if (!customer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = Jwt.sign(
      { customerId: customer._id, role: "customer" },
      process.env.JWT,
      { expiresIn: "1d" }
    );

    // Extracting required customer fields
    const { _id, name, email, phoneNumber } = customer;

    // Sending required fields along with the token
    res.status(200).json({
      token,
      customer: {
        _id,
        name,
        email,
        phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { customerRegister, customerLogin };
