// require packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rowdy = require('rowdy-logger')
const authLockedRoute = require('./controllers/api-v1/authLockedRoute')

// config express app
const app = express()
const PORT = process.env.PORT || 8000 
// for debug logging 
const rowdyResults = rowdy.begin(app)
// cross origin resource sharing 
app.use(cors())
// request body parsing
// app.use(express.urlencoded({ extended: false })) // optional
app.use(express.json())


const myMiddleWare = (req, res, next ) => {
  console.log('hello from a middleware')
  next() // okay express, go to the next thing
}


// app.use(myMiddleWare)

// GET / -- test index route
// route specific middleware, only will be applied here on this route
// app.get('/', authLockedRoute, (req, res) => {
  //   console.log(res.locals)
  //   res.json({ msg: 'hello backend 🤖' })
  // })
  
// ONLY FOR TESTING PURPOSES, DO NOT USE IN FRONTEND
app.get('/', (req, res) => {
  res.json("Hello from backend")
})

// app.use('/api-v1/', require('./controllers/api-v1/home.js'))
  
  // controllers
  // prefixing the routes with a semantic version 
  app.use('/api-v1/users', require('./controllers/api-v1/users.js'))
  
  // cafe.js controller routing
  app.use('/api-v1/cafes', require('./controllers/api-v1/cafes.js'))
  
  // comments.js controller routing
  // app.use('/api-v1/comments', require('./controllers/api-v1/comments.js'))
  
  // hey listen
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`is that port ${PORT} I hear? 🙉`)
})