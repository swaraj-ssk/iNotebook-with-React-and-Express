const express = require('express');
const router = express.Router();
const User = require("../models/Users.js");
const { check, validationResult } = require('express-validator');


// Create a user using POST : "/api/auth/createuser". No login required
router.post('/createuser',
    [
        check('name', "Enter valid name").isLength({ min: 3 }),
        check('email', "Enter valid email").isEmail(),
        // password must be at least 5 chars long
        check('password', "Password should be minimum 4 words").isLength({ min: 5 })
    ]
    //If there are errors, return bad requests and the errors
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }
        //Check if user exist already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist." });
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            // .then(user => res.json(user))
            // .catch((err)=>{
            //     console.log("Error has occured "+ err)
            // });
            res.json(user);

        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Some error occured");
        }
    })

module.exports = router