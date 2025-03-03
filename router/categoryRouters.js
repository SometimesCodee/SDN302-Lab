const express = require('express');
const categoryRouter = express.Router();
const { 
    getAllCategory,
    addNewCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController');

categoryRouter.get('/', getAllCategory);
categoryRouter.post('/', addNewCategory);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.put('/:id', updateCategory);

module.exports = categoryRouter;