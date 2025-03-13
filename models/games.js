//games schema here
const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true, 'the game needs to have a title'],
        maxLength : [200, 'the title needs to be lower than 200 characters']
    },
    owner : {
        type : String,
        trim : true,
        required : [true, 'the game needs to have a owner'],
        maxLength : [200, 'the owner name needs to be lower than 200 characters']
    },
    rating : {
        type : Number,
        min : [0, 'the rating needs to be above or equal to 0'],
        trim : true
    },
    year : {
        type : Number,
        required : [true, 'it needs to have a year'],
        min : [1800, 'the release year needs to be above 1500'],
        max : [new Date().getFullYear(), 'the release date can not be in the future'],
        trim : true,
    }
})

module.exports = mongoose.model('Game', gameSchema)