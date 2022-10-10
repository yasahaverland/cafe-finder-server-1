const express = require('express')
const router = express.Router()
const db = require('../../models')

// GET /comments
router.get('/', (req, res) => {
    try {
        res.json({ msg: 'welcome to the comments endpoint' })
    } catch(err) {
        console.warn(err)
    }
})

module.exports = router
