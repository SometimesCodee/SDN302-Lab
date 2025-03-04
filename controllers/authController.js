const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../model/Customer');
const Admin = require('../model/Admin');

// Temporary hardcoded secret (FOR TESTING ONLY)
const JWT_SECRET = 'your_super_secret_key_here_123456789';

// Customer Registration
exports.registerCustomer = async (req, res) => {
    try {
        const { username, email, password, fullName, phone } = req.body;

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingCustomer) {
            return res.status(400).json({ 
                message: 'User already exists with this email or username' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new customer
        const customer = new Customer({
            username,
            email,
            password: hashedPassword,
            fullName,
            phone
        });

        await customer.save();

        // Create token using hardcoded secret
        const token = jwt.sign(
            { userId: customer._id, type: 'customer' },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Customer registered successfully',
            token,
            customer: {
                id: customer._id,
                username: customer.username,
                email: customer.email,
                fullName: customer.fullName
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Error registering customer', 
            error: error.message 
        });
    }
};

// Customer Login
exports.loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find customer
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, customer.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: customer._id, type: 'customer' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            customer: {
                id: customer._id,
                username: customer.username,
                email: customer.email,
                fullName: customer.fullName
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message 
        });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: admin._id, type: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error logging in', 
            error: error.message 
        });
    }
}; 