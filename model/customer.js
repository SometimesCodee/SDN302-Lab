const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Sẽ được hash trước khi lưu
  phone: { type: String, required: true, unique: true, length: 10 },
  address: [{
    street: String,
    city: String,
    state: String,
    country: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
