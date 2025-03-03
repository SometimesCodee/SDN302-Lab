const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, validate: {
      validator: async (id) => {
        const user = await UserSchema.findById(id);
        return user && user.role === 'user';
      },
      message: 'Customer must be a user'
    }
  },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true, min: { value: 0, message: 'Total price must be greater than 0' } },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: { value: 1, message: 'Quantity must be at least 1' } }
  }],
  address: [{
    street: String,
    city: String,
    state: String,
    country: String
  }],
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
