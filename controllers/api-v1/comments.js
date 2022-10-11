const express = require('express')
const router = express.Router()
const db = require('../../models')

// GET /comments -- testing the comment.js endpoint
router.get('/', (req, res) => {
    try {
        res.json({ msg: 'welcome to the comments endpoint' })
    } catch(err) {
        console.warn(err)
    }
})

// GET /comments/:id -- get a specific comment
// router.get('/:id', async (req, res) => {
//     try {
//         const comment = await axios.Cafe.get()
//         res.json({ msg: 'this will be a specific comment'})
//     } catch(err) {
//         console.warn(err)
//     }
// })

// GET /cafes/:yelpId/comments -- get all the comments for a specific cafe (needs to move to cafes.js)
// router.get('/cafes/:id/comments', (req, res) => {
//     try {
//         res.json({ msg: 'this will show all the comments for a specific cafe'})
//     } catch(err) {
//         console.warn(err)
//     }
// })

// POST /cafes/:id -- add a comment to a cafe
// router.post('/:yelpId/comments', async (req, res) => {
//     try {
//         const newComment = await db.Cafe.create({

//         }) // NEED TO FIGURE OUT FORM DATA FROM CLIENT
//         res.status(201).jason(newComment)
//         // res.json({ msg: 'this will post a new comment to a specif cafe'})
//     } catch(err) {
//         console.warn(err)
//     }
// })

// PUT /comments/:id -- update a comment
router.put('/:id', async (req, res) => {
    try {
        const options = { new: true }
        const updatedComment = await db.Cafe.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatedComment)
    } catch(err) {
        console.warn(err)
    }
})

// DELETE /comments/:id -- delete a comment
router.delete('/:id', async (req, res) => {
    try {
        await db.Cafe.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch(err) {
        console.warn(err)
    }
})

module.exports = router
