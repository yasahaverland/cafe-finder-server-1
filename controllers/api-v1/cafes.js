const router = require('express').Router()
const db = require('../../models')
const axios = require('axios')
require('dotenv').config()
const jwt = require('jsonwebtoken')
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
        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId }).populate({ path: 'comment', populate: 'user' })
        console.log(foundCafe.comment)
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
router.post('/:yelpId/:userId/comments', async (req, res) => {
    try {
        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundUser = await db.User.findOne({ _id: req.params.userId })

        foundCafe.comment.push({ content: req.body.content, drink_name: req.body.drink_name, drink_score: req.body.drink_score, user: foundUser })
        await foundCafe.save()
        const payload = {
            name: foundUser.name,
            email: foundUser.email,
            id: foundUser.id,
            cafe: foundUser.cafe
        }

        // sign jwt and send back
        const token = await jwt.sign(payload, process.env.JWT_SECRET)

        res.json({ foundCafe, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// PUT /:yelpId/:id/:comments -- edit a comment, (if comment look weird in user profile check here).
router.put('/:yelpId/:id/comments', async (req, res) => {
    try {
        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundUser = await db.User.findOne({ _id: req.params.id })

        foundCafe.comment.splice(req.params.id, 1, { content: req.body.content, drink_name: req.body.drink_name, drink_score: req.body.drink_score })

        await foundCafe.save()
        const payload = {
            name: foundUser.name,
            email: foundUser.email,
            id: foundUser.id,
            cafe: foundUser.cafe
        }

        // sign jwt and send back
        const token = await jwt.sign(payload, process.env.JWT_SECRET)

        res.json({ foundCafe, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})


// DELETE /:yelpId/:id/comments -- deletes a comment, (if comment look weird in user profile check here).
router.delete('/:yelpId/:id/comments', async (req, res) => {
    try {

        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundUser = await db.User.findOne({ _id: req.params.id })
        foundCafe.comment.splice(req.params.id, 1)
        await foundCafe.save()
        const payload = {
            name: foundUser.name,
            email: foundUser.email,
            id: foundUser.id,
            cafe: foundUser.cafe
        }

        // sign jwt and send back
        const token = await jwt.sign(payload, process.env.JWT_SECRET)

        res.json({ foundCafe, token })
    } catch (err) {

        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})





// PUT /cafes/:id -- saves/removes a cafe from user's Model and saves/removes a user from the cafe's Model
router.put('/:yelpId/:userId', async (req, res) => {
    try {
        // const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundCafe = await db.Cafe.findOne({ yelpId: req.params.yelpId })
        const foundUser = await db.User.findOne({ _id: req.params.userId }).populate('cafe')

        // console.log(foundCafe)

        if (foundUser.cafe.includes(foundCafe._id) == true) {
            foundCafe.user.splice(foundCafe.user.indexOf(foundUser._id), 1)
            foundUser.cafe.splice(foundUser.cafe.indexOf(foundCafe._id), 1)
            // update token here
            await foundCafe.save()
            await foundUser.save()
            const payload = {
                name: foundUser.name,
                email: foundUser.email,
                id: foundUser.id,
                cafe: foundUser.cafe
            }

            // sign jwt and send back
            const token = await jwt.sign(payload, process.env.JWT_SECRET)

            res.json({ foundCafe, token })

        } else {
            foundCafe.user.push(foundUser)
            foundUser.cafe.push(foundCafe)
            // and update token here
            foundCafe.save()
            foundUser.save()

            // create jwt payload
            // const payload = {
            //     name: foundUser.name,
            //     email: foundUser.email,
            //     id: foundUser.id,
            //     cafe: foundUser.cafe
            // }
            const payload = {
                name: foundUser.name,
                email: foundUser.email,
                id: foundUser.id,
                cafe: foundUser.cafe
            }

            // sign jwt and send back
            const token = await jwt.sign(payload, process.env.JWT_SECRET)

            res.json({ foundCafe, token })

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})


module.exports = router