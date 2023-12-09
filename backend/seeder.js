import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// import data into a MongoDB database
const importData = async () => {
    try {
        // Deletes all existing orders, users, and products in the database.
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        // Inserts user data from the users array into the User model.
        const createdUsers = await User.insertMany(users);
        // Retrieves the ID of the first user (adminUser).
        const adminUser = createdUsers[0]._id;
        // Maps over the products array and adds the adminUser's ID to each product.
        const samepleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        });
        // Inserts the modified product data into the Product model.
        await Product.insertMany(samepleProducts);
        // Logs a message indicating that the data import process has been completed.
        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Deletes all existing orders, users, and products in the database.
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        // Logs a message indicating that the data destroy process has been completed.
        console.log('Data Destrpyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2] === '-destroy'){
    destroyData();
} else {
    importData();
}