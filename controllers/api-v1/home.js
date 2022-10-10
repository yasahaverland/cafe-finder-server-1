const express = require('express')
const router = express.Router()
const db = require('../../models')


// GET -- .com/api-v1/
router.get('/', (req, res) => {
    res.json({ msg: 'welcome to the Home page' })
})



module.exports = router