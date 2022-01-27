require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected'))

app.use(express.json())

const apiRoute = require('./routes/api')
app.use('/api', apiRoute)

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.listen(3000)
