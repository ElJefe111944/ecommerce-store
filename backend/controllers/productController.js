import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js";

// description: Fetch all products
// route: GET /api/products
// access: public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});
// description: Fetch a product
// route: GET /api/product/:id
// access: public
const getProductById = asyncHandler(async (req, res) => {
    const product =  await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});
// description: create a product
// route: POST /api/products
// access: Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Product name',
        price: 0,
        user: req.user._id,
        image: 'images/sample.jpg',
        brand: 'Product brand',
        category: 'Product category',
        countInStock: 0,
        numReviews: 0,
        description: 'Product description',
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// description: Update/Edit a product
// route: PUT /api/products/:id
// access: Private/Admin

const updateProducts = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        throw new Error('Resource not found');
    }
});

export { getProducts, getProductById, createProduct, updateProducts };