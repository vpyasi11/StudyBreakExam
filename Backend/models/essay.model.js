const mongoose = require('mongoose')

const EssaySchema = new mongoose.Schema({
    textQuestion: {
        type : String,
        required : true,
    },
    imageQuestion: {
        type : String,
        required : false,
    },
    marks : {
        type : Number,
        required : true,
    },
    solution : {
        type : String,
        required : true,
        maxlength : 100000,
    }
     
})


module.exports = mongoose.model('EssayDatabase', EssaySchema)



