const express = require('express');
const User = require('../../models/User');

const router = express.Router();

// Get all users (Admin only)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single user (Admin only)
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create user (Admin only)
router.post('/users', async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const user = await User.create({ name, email, phone, role });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user (Admin only)
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email, phone, role } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role) user.role = role;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user (Admin only)
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router; 