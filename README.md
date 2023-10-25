Food Ordering Platform

Description
This system allows:

Restaurant owners to register, login, create, update, and delete food items.
Customers to register, login, place orders, and fetch order details.
Both restaurants and customers are authenticated using JWT.



API Endpoints

Restaurants
Register a new restaurant: POST /api/v1/restaurant/register
Login for restaurant: POST /api/v1/restaurant/login
Create a new food item: POST /api/v1/restaurant/create/food
Get a specific food item: GET /api/v1/restaurant/get/food/:id
Update a specific food item: PUT /api/v1/restaurant/update-food/:foodId
Delete a specific food item: DELETE /api/v1/restaurant/delete-food/:foodId
List all restaurants: GET /api/v1/restaurant/list-names


Customers
Register a new customer: POST /api/v1/customer/register
Login for customer: POST /api/v1/customer/login


Orders
Place a new order: POST /api/v1/order/place-order
Fetch all orders: GET /api/v1/order/fetch-order
Update order status: PUT /api/v1/order/update-order-status/:orderId


Models
Restaurant: Contains information about the restaurant such as name, email, password, address, opening, and closing time.
Customer: Contains customer details like name, email, phone number, and shipping address.
Order: Contains order details including the customer, restaurant, items, shipping address, total price, order status, payment status, and payment method.
Food Product: Contains food product details like the item name, price, description, picture, total quantity, and total sold.

Middlewares
restaurantOwnerIsLoggedIn: To verify if a restaurant owner is logged in.
customerIsLoggedIn: To verify if a customer is logged in.



Controllers
RestaurentUserCtrl: Handles restaurant registration, login, and listing all restaurants.
restaurantFoodProduct: Manages CRUD operations for food items.
orderCtrl: Manages the creation, retrieval, and update of orders.
customerUserCtrl: Handles customer registration and login.



To run the server :  npm start
