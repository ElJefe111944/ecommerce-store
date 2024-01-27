import path from "path";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;
// Database Connection:
connectDB();

const app = express();
// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// cookie parser middleware
app.use(cookieParser())

//Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
// Paypal 
app.get('/api/config/paypal', (req, res) => res.send({ 
    clientId: process.env.PAYPAL_CLIENT_ID
 }));

// set __dirname to current directory
const __dirname = path.resolve(); 
// set upload folder as static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

// Error Handling Middleware:
app.use(notFound);
app.use(errorHandler);
// Server Listening:
app.listen(port, () => console.log(`Server running on port ${port}`));