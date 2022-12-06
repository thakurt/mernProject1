const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const catRouter = require('./routes/categories')
const multer = require('multer')
const path = require('path')
const bodyParser = require("body-parser")
const cors = require('cors')



app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "/images")))

app.use(cors())

dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(console.log("MongoDB connection is successfull"))
    .catch((err) => console.log(err));

// Uploading images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, 
    
    filename: (req, file, cb) => {
        cb(null, req.body.name)
        
  
    }
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploaded")
})

//auth routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/categories', catRouter)

app.listen(PORT, (req, res) => {
    console.log(`server is running at ${PORT}`)
})
