const router = require('express').Router()
const db = require('../../models')
const axios = require('axios')
require('dotenv').config()

// EXAMPLE API CALL
router.get('/', async(req, res) => {
    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco', {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        })
        console.log(response.data)
        res.json(response.data)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// .com/api-v1/results?=:location 
// router.get('/results?=:locationId', async (req, res) => {
//     try {
        
//     } catch(err) {
//         console.log(err)
//         res.status(500).json({ message: 'internal server error' })
//     }
// })



// GET /cafes/:id -- return a single cafe
router.get('/:id', async (req, res) => {
    try {
        const cafe = await db.Cafe.findById(req.params.id)

        res.json(cafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// POST /cafes/:id -- create a new cafe in the db -- needs signal from client
router.post('/:id', async (req, res) => {
    try {
        const newCafe = await db.Cafe.create(req.body)
        res.status(201).json(newCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// PUT /cafes/:id -- update a single cafe
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

 
// DELETE /cafe/:id -- delete a cafe from the database
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