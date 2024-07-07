const express = require('express');
const router = express.Router();
const User = require("../models/Users.js");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser.js');

const JWT_SECRET = "MyName@isSwaraj";

//ROUTE 1 : Create a user using POST : "/api/auth/createuser". No login required
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
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            console.log(authtoken);
            res.json({
                authtoken
            })

        }
        catch (error) {
            console.error(error.message);
            return res.status(500).send("Some error occured");
        }
    }
)


//ROUTE 2 : Authenticate User using POST "/api/auth/login/". No login required
router.post('/login',
    [
        check('email', "Enter valid email").isEmail(),
        check('password', "Password should be minimum 4 words").exists()
    ],
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }

        let success= false

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success= true;
            console.log(authtoken);
            res.json({
                success,
                authtoken
            })

        }
        catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal server error");
        }
    }
)

//ROUTE 3 : GET loggedIn user details using POST "/api/auth/getuser/". Login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password"); //-password ensures to select all fields except password
        res.send(user)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error");
    }
}
)




module.exports = router