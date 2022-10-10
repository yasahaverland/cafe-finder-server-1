const router = require('express').Router()
const db = require('../../models')
const axios = require('axios')
require('dotenv').config()

// EXAMPLE API CALL - need to make this into /cafes/:id/results
router.get('/:parameter', async(req, res) => {
    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            params: {
                'location': `92886`,
                'term': 'coffee shop'
            },
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

// GET /cafes/results?=:searchParameters

// GET /cafes/:id -- return a single cafe based on Yelp's id
router.get('/:yelpId', async (req, res) => {
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.yelpId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        })
        res.json(response.data)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// POST /cafes/:id -- saves a cafe into the db
router.post('/:yelpId', async (req, res) => {
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.yelpId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        })
        
        const newCafe = await db.Cafe.create({
            yelpId: response.data.id,
            name: response.data.name,
            // location: `${response.data.location.display_address[0]} ${response.data.location.display_address[1]} ${response.data.location.display_address[2]}`,
            location: `${response.data.location.display_address[0]}`,
            website_link: response.data.url,
            phone_number: response.data.display_phone,
            price: response.data.price
        })
        console.log(newCafe)
        res.status(201).json(newCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// PUT /cafes/:id -- update a single cafe -- should not be used unless editing
router.put('/:yelpId', async (req, res) => {
    try {
        // getting the id from the url route parameters
        // getting the data to update from the request body
        // ensuring that the query returns the new values with the options object
        const options = { new: true }
        const updatedCafe = await db.Cafe.findByIdAndUpdate({yelpId: req.params.yelpId}, {
            yelpId: response.data.id,
            name: response.data.name,
            location: `${response.data.location.display_address[0]} ${response.data.location.display_address[1]} ${response.data.location.display_address[2]}`,
            website_link: response.data.url,
            phone_number: response.data.display_phone,
            price: response.data.price
            }, options)
        res.json(updatedCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }    
 })

 
// DELETE /cafe/:id -- delete a cafe from the database
router.delete('/:yelpId', async (req, res) => {
    try {
        // delete that thing with that id
        await db.Cafe.findOneAndDelete({yelpId: req.params.yelpId})
        // status 204 -- no content (we cannot send and json data back with this)
        res.sendStatus(204)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
    
})
module.exports = router