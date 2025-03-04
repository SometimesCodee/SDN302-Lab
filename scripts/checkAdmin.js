require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../model/Admin');

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const admin = await Admin.findOne({ email: 'admin@example.com' });
        if (admin) {
            console.log('Admin user exists:');
            console.log({
                username: admin.username,
                email: admin.email,
                role: admin.role,
                id: admin._id
            });
        } else {
            console.log('No admin user found with email: admin@example.com');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

checkAdmin(); 