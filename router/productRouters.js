const express = require('express');
const productRouter = express.Router();
const { 
    getAllProduct,
    addNewProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

productRouter.get('/', getAllProduct);
productRouter.post('/', addNewProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/:id', updateProduct);

module.exports = productRouter;