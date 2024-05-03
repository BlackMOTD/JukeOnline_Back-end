
const express = require('express')
const router = express.Router()
const controllerMusic = require('../controllers/Music')

router.get('/', (req, res) => {
    res.status(200).json({ success: 'Welcome to API in GET!' })
})

router.post('/', (req, res) => {
    res.status(200).json({ success: 'Welcome to API in POST!' })
})

router.get('/music', controllerMusic.find)

router.post('/music', controllerMusic.create)

router.delete('/music!:id', controllerMusic.delete)

router.get('/music!:id', controllerMusic.findById)

router.get('/music!', controllerMusic.IdNotFound)

router.get('/music/random', controllerMusic.random)


module.exports = router
