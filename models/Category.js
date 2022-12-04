const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({


    name: {

        type: String,
        required: true,
        unique: true
    }

},
    {
        timestamps: true // it will create our updated and created at time
    });

module.exports = mongoose.model("Category", CategorySchema)