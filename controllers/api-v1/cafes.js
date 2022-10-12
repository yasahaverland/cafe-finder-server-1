const router = require('express').Router()
const db = require('../../models')
const axios = require('axios')
require('dotenv').config()
// const jwt = require('jsonwebtoken')
// const authLockedRoute = require('./authLockedRoute')

// GET /cafes/:searchId
router.get('/results/:searchId', async (req, res) => {
    try {
        const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
            params: {
                'location': `${req.params.searchId}`,
                'term': 'coffee shop'
            },
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        })
        console.log(response.data)
        res.json(response.data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// GET /cafes/:id -- return a single cafe based on Yelp's id
router.get('/:yelpId', async (req, res) => {
    try {
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.yelpId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        })

        const address = response.data.location.display_address.map(part => {
            return (
                " " + part
            )
        })

        await db.Cafe.findOneAndUpdate({ yelpId: req.params.yelpId },
            {
                $set:
                {
                    yelpId: response.data.id,
                    name: response.data.name,
                    location: `${address}`,
                    website_link: response.data.url,
                    phone_number: response.data.display_phone,
                    price: response.data.price
                }
            }, { upsert: true })
        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        res.json(foundCafe)
    } catch (err) {
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


        console.log(newCafe)
        res.status(201).json(newCafe)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// POST /:yelpId/comments -- create a new comment
router.post('/:yelpId/comments', async (req, res) => {
    try {
        const foundCafe = await db.Cafe.findOne({yelpId: req.params.yelpId})
        foundCafe.comment.push({ content: 'hello new coffee shop!', drink_name: 'Americano', drink_score: '5'})
        foundCafe.save(err => {
            if (!err) console.log('New comment created!')
        })
        res.json(foundCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// PUT /:yelpId/comments/:id -- edit a comment, (if comment look weird in user profile check here).
router.put('/:yelpId/comments/:id', async (req, res) => {
    try {
        const foundCafe = await db.Cafe.findOne({yelpId: req.params.yelpId})
        foundCafe.comment.splice(req.params.id, 1, { content: 'hello again favorite coffee shop!', drink_name: 'Black coffee', drink_score: '5'})
        foundCafe.save(err => {
            if (!err) console.log('Editing comment!')
        })
        res.json(foundCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})


// PUT /:yelpId/comments/:id -- edit a comment, (if comment look weird in user profile check here).
router.delete('/:yelpId/comments/:id', async (req, res) => {
    try {

        const foundCafe = await db.Cafe.findOne({yelpId: req.params.yelpId})
        foundCafe.comment.splice(req.params.id, 1)
        foundCafe.save(err => {
            if (!err) console.log('Delete comment!')
        })
        res.json(foundCafe)
    } catch(err) {

        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})


// PUT /cafes/:id -- update a single cafe -- should not be used unless editing
router.put('/:yelpId/:userId', async (req, res) => {
    try {
        // const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundUser = await db.User.findOne({ _id: req.params.userId })

        console.log(foundCafe)
        
        if(foundUser.cafe.includes(foundCafe._id) == true) {
            foundCafe.user.splice(foundCafe.user.indexOf(foundUser._id), 1)
            foundUser.cafe.splice(foundUser.cafe.indexOf(foundCafe._id), 1)
            foundCafe.save(err => {
                if (!err) console.log('deleting user from cafe')
            })
            foundUser.save(err => {
                if (!err) console.log('deleting cafe from user')
            })

        // } else if(!foundCafe.user.includes(req.params.userId)) {
        } else {
            foundCafe.user.push(foundUser)
            foundUser.cafe.push(foundCafe)
            foundCafe.save(err => {
                if (!err) console.log('adding user to cafe', req.params.userId)
            })
            foundUser.save(err => {
                if (!err) console.log('Adding cafe to user')
            })
        }
        

        res.json(foundCafe)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }    
 })


// DELETE /cafe/:id -- delete a cafe from the database

// router.delete('/:yelpId', async (req, res) => {
//     try {
//         // delete that thing with that id
//         await db.Cafe.findOneAndDelete({yelpId: req.params.yelpId})
//         // status 204 -- no content (we cannot send and json data back with this)
//         res.sendStatus(204)
//     } catch(err) {
//         console.log(err)
//         res.status(500).json({ message: 'internal server error' })
//     }
    
// })

// GET /auth-locked - will redirect if bad jwt token is found
// router.get('/auth-locked', authLockedRoute, (req, res) => {
//     // you will have access to the user on the res.locals.user
//     console.log(res.locals)
//     res.json( { msg: 'welcome to the private route!' })
//   })

module.exports = router