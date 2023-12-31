import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js";

// Note: id will be obtained from order in the cookie

// description: Create new order
// route: POST /api/orders
// access: private

const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
     } = req.body;

     if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
     } else {
        const order = new Order({
            orderItems: orderItems.map((item) => ({
                ...item, 
                product: item._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
     };
});

// description: Get logged in users order
// route: GET /api/orders/myorders
// access: private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// description: Get order by ID
// route: GET /api/orders/:id
// access: private/admin

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 
    'name email');

    if(order){
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    };
});

// description: Update order to paid
// route: PUT /api/orders/:id/pay
// access: private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// description: Update order to delievered
// route: PUT /api/orders/:id/deliver
// access: private/admin

const updateToDelivered = asyncHandler(async (req, res) => {
    res.send('Update to delivered');
});

// description: Get all orders
// route: GET /api/orders
// access: private/admin

const getAllOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
});

export {
    addOrderItems,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateToDelivered,
    updateOrderToPaid,
}
