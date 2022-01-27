const mongoose = require('mongoose')

const infoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('newData', infoSchema)
