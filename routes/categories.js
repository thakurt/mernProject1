const router = require("express").Router();
const Category = require("../models/Category");
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
router.use(bodyParser.json())

// parse application/x-www-form-urlencoded

router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router

// multer will help to upload files