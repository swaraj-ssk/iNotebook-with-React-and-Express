const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser.js');
const Notes = require("../models/Notes.js");
const { check, validationResult } = require('express-validator');


// ROUTE 1 : Get all notes using GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Some error occured");
    }
})

// ROUTE 2 : Add a new notes using POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser,
    [
        check('title', "Enter valid title").isLength({ min: 3 }),
        check('description', "Enter valid description").isLength({ min: 5 }),
    ],

    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

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

// ROUTE 3 : Update existing note using PUT "/api/notes/updatenote/:id". Login required

router.put("/updatenote/:id", fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;

        try {
            //Create a newNote object
            const newNote = {};
            if (title) {
                newNote.title = title;
            }
            if (description) {
                newNote.description = description;
            }
            if (tag) {
                newNote.tag = tag;
            }

            //Find the note to be deleted and delete it
            let note = await Notes.findById(req.params.id) //this id is from url
            if (!note) { return res.status(404).send("Not found") }

            if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed"); }

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });

        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Some error occured");
        }
    }
)

// ROUTE 4  : Deleting existing note using DELETE "/api/notes/deletenode/:id". Login required

router.delete("/deletenote/:id", fetchuser,
    async (req, res) => {

        try {
            //Find the note to be deleted and delete it
            let note = await Notes.findById(req.params.id) //this id is from url
            if (!note) { return res.status(404).send("Not found") }

            //Allow deletion only if user owns this note
            if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed"); }

            note = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: note });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Some error occured");
        }
    }
)

module.exports = router