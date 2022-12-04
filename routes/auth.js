const router = require('express').Router()
const User = require('../models/User')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')



router.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
router.use(bodyParser.json())

// parse application/x-www-form-urlencoded



//REGISTER
router.post('/register', async (req, res) => {
    try {
        // code for bcrypt the password
        const salt = await bcrypt.genSalt(10)
        const heashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: heashedPass
        })

        const user = await newUser.save();
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)

    }
})

//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(400).json("Wrong credetial")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json('Wrong credential')

        // it going to show everything except password
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router