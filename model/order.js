const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, default: 'pending', enum: ['pending', 'shipped', 'delivered'] }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
