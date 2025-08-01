const express = require('express');
// const User = require('../../models/User');

const router = express.Router();
console.log("hello route");

router.get('/', async(req, res) => {
    res.json("Hello World");
});

// Make sure router is the default export
module.exports = router; 