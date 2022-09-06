const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')
const secretKey = process.env.JWT_SECRET

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    // Get the username and password from the request body

    const userExists = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if(!userExists) {
        res.status(401).json({error: "error user does not exist"})
    }

    const hashValidId = await bcrypt.compare(password, userExists.password)

    if(!hashValidId) {
        res.status(401).json({error: "error invalid password"})
    }

    const token = jwt.sign({username}, secretKey)

    res.status(200).json({token})

    // Check that a user with that username exists in the database
    // Use bcrypt to check that the provided password matches the hashed password on the user
    // If either of these checks fail, respond with a 401 "Invalid username or password" error

    // If the user exists and the passwords match, create a JWT containing the username in the payload
    // Use the JWT_SECRET environment variable for the secret key

    // Send a JSON object with a "token" key back to the client, the value is the JWT created
});

module.exports = router;
