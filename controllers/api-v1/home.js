const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', (req, res) => {
    res.json({ msg: 'welcome to the Home page' })
})


  
// GET /cafe -- return array of all cafes
router.get('/', async (req, res) => {
    try {
        const cafes = await db.Cafe.find({})
            res.json(cafes)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// GET /cafe/:id -- return a single cafe
router.get('/:id', async (req, res) => {
    try {
        const cafe = await db.Cafe.findById(req.params.id)
        res.json(cafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// POST /cafe -- create a new cafe in the db
router.post('/', async (req, res) => {
    try {
        const newCafe = await db.Cafe.create(req.body)
        res.status(201).json(newCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// PUT /cafe/:id -- update a single cafe
router.put('/:id', async (req, res) => {
    try {
        // getting the id from the url route parameters
        // getting the data to update from the request body
        // ensuring that the query returns the new values with the options object
        const options = { new: true }
        const updatedCafe = await db.Cafe.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatedCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }    
 })

// DELETE /cafe/:id -- destroy a cafe

router.delete('/:id', async (req, res) => {
    try {
        // delete that thing with that id
        await db.Cafe.findByIdAndDelete(req.params.id)
        // status 204 -- no content (we cannot send and json data back with this)
        res.sendStatus(204)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
    
})

module.exports = router