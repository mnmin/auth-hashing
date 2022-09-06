const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')
const saltRounds = 10

router.post('/', async (req, res) => {
    // Get the username and password from request body
    const { username, password } = req.body

    const encryptedPw = await bcrypt.hash(password, saltRounds)

    const newUser = await prisma.user.create({
        data: {
            username,
            password: encryptedPw
        }
    })
    
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    
    // Save the user using the prisma user model, setting their password to the hashed version
    
    // Respond back to the client with the created users username and id
    res.status(201).json({ user: {username: newUser.username, id: newUser.id} })
});

module.exports = router;
