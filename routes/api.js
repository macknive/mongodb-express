const express = require('express')
const router = express.Router()
const Info = require('../models/info')

//Get all
router.get('/', async (req, res) => {
  try {
    const information = await Info.find()
    res.json(information)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Get One
router.get('/:id', fetchData, (req, res) => {
  res.send(res.data.name)
})

//Create
router.post('/', async (req, res) => {
  const data = new Info({
    name: req.body.name,
    info: req.body.info,
  })

  try {
    const newData = await data.save()
    res.status(201).json(newData)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//Update
router.patch('/:id', fetchData, async (req, res) => {
  if (req.body.name != null) {
    res.data.name = req.body.name
  }
  if (req.body.info != null) {
    res.data.info = req.body.info
  }
  try {
    const updatedData = await res.data.save()
    res.json(updatedData)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete
router.delete('/:id', fetchData, async (req, res) => {
  try {
    await res.data.remove()
    res.json({ message: 'data deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function fetchData(req, res, next) {
  try {
    data = await Info.findById(req.params.id)
    if (!data) {
      res.status(404)
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  res.data = data
  next()
}

module.exports = router
