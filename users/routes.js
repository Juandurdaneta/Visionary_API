const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

// secret key
const secretKey = process.env.SECRET_KEY

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
// authenticate user

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({email: email}, (err, foundUser) => {
        if(!err) {
            if(foundUser && bcrypt.compareSync(password, foundUser.password)) {

                jwt.sign(foundUser._doc, secretKey, (err, token)=>{

                    if(!err){
                        res.send({
                            status: 200,
                            token: token,
                            username: foundUser.username
                        })
                    } else {
                        console.log(err)
                        res.send( JSON.stringify(err))
                    }

                })

            } else {
                res.send({
                    status: 400,
                    message: 'Failed to authenticate, please check your credentials and try again.'
                })
            }
        } else {
            console.log(err)
            res.send({
                status: 400,
                message: "An error has occurred, please try again."
            })
        }
    })

})



module.exports = router;
