const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/"

const connectToMongo= ()=>{
    mongoose.connect(mongoURI).then(
        (res)=>{
            console.log("Mongo connected succesfully")
        }
    )
}

module.exports = connectToMongo;