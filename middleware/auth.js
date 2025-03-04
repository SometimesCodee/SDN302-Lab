const jwt = require('jsonwebtoken');
const Customer = require('../model/Customer');
const Admin = require('../model/Admin');

exports.protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check user type and attach user to request
        if (decoded.type === 'customer') {
            const customer = await Customer.findById(decoded.userId).select('-password');
            if (!customer) {
                return res.status(401).json({ message: 'Token is not valid' });
            }
            req.user = customer;
            req.userType = 'customer';
        } else if (decoded.type === 'admin') {
            const admin = await Admin.findById(decoded.userId).select('-password');
            if (!admin) {
                return res.status(401).json({ message: 'Token is not valid' });
            }
            req.user = admin;
            req.userType = 'admin';
        }

        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.adminOnly = (req, res, next) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
}; 