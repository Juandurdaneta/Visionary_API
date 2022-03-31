const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// schemas
const userSchema = require('./models.js')
const User = userSchema.getUser();

// utils
const utils = require('./utils')

// bcrypt configuration
const bcrypt = require('bcrypt');
const saltRounds = 10

// multer configuration
const multer = require('multer');
const upload = multer();

// routes

// create user

router.post('/register', (req, res)=>{
    const { username, email, password } = req.body;
    const newUser = new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, saltRounds),
        profile: utils.setProfilePicture(username)
    });


    newUser.save((err)=>{
        if(err) {
            console.log(err);
            res.send({
                status: 400,
                message: "An error has occurred while creating your user. Please try again."
            });
        } else {
            console.log(newUser);
            res.send({
                status: 200,
                message: "User created succesfully!"
            })
        }
    });


})

module.exports = router;
