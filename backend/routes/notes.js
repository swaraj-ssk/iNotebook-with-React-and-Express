const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser.js');
const Notes = require("../models/Notes.js");
const { check, validationResult } = require('express-validator');


// ROUTE 1 : Get all notes using GET "/api/auth/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Some error occured");
    }
})

// ROUTE 2 : Add a new notes using POST "/api/auth/addnote". Login required
router.post("/addnote", fetchuser,
    [
        check('title', "Enter valid title").isLength({ min: 3 }),
        check('description', "Enter valid description").isLength({ min: 5 }),
    ],

    async (req, res) => {
        try {
            const {title, description, tag} = req.body;
            
            const result = validationResult(req);
            if (!result.isEmpty()) {
                res.status(400).json({ errors: result.array() });
            }

            const note = new Notes({
                title, description, tag, user: req.user.id
            })

            const savednotes = await note.save();

            res.json(savednotes)

        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Some error occured");
        }
    }
)

module.exports = router