const router = require('express').Router()
const User = require('../models/User')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const Post = require('../models/Post')


router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json())
// parse application/x-www-form-urlencoded



//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)

        }
    }
    else {
        res.status(401).json("You can update only your account")
    }
})


//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted")
            }
            catch (err) {
                res.status(500).json(err)
            }
        } catch {
            res.status(404).json(" user not found")
        }
    }
    else {
        res.status(401).json("you can only delete your account")
    }
})


//GET user 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(err)

    }
})


module.exports = router