import FoodProduct from "../models/FoodProductSchema.js";
import Order from "../models/OrderSchema.js";

const createOrder = async (req, res) => {
  try {
    const { restaurant, items, shippingAddress, paymentMethod } = req.body;

    // Fetch customer details using customer ID from middleware
    const customerDetails = await Customer.findById(req.user._id);
    if (!customerDetails) {
      return res.status(404).json({ error: "Customer not found." });
    }

    // Calculate total price
    let totalPrice = 0;

    const foodItems = await Promise.all(
      items.map(async (item) => {
        const food = await FoodProduct.findById(item.foodProduct);
        if (!food) {
          throw new Error(`Food item ${item.foodProduct} not found`);
        }

        //! Check if enough stock is available
        if (food.totalQty < item.quantity) {
          throw new Error(`Not enough stock for ${food.itemName}`);
        }

        // Update the total sold and total quantity for the food item
        food.totalSold += item.quantity;
        food.totalQty -= item.quantity; // Decrease the totalQty

        const itemTotal = food.price * item.quantity; // Fixed multiplication instead of addition
        totalPrice += itemTotal;

        await food.save();

        return {
          foodProduct: item.foodProduct,
          quantity: item.quantity,
        };
      })
    );

    const order = new Order({
      customer: customerDetails._id, // Use the customer ID from customerDetails
      restaurant,
      items: foodItems,
      shippingAddress: {
        ...shippingAddress,
        name: customerDetails.name, // Optionally use the name from customerDetails
      },
      totalPrice,
      paymentMethod,
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    const order = await Order.find({});
    if (!order) {
      return res.status(401).json({ error:" No orders to fetch!" });
    }

    res
      .status(201)
      .json({ message: "Orders Fetched Successfully", order: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Status:
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId) // Corrected this line
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    order.orderStatus= status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully.", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { createOrder, getOrders, updateOrderStatus };