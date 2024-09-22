const mongoose= require('mongoose')
const colors= require('colors')

const connectDb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connection established ${mongoose.connection.host}`.bgYellow.white)
    } catch (error) {
        console.log(`Error in Database connection`.bgRed.white, error)
        
    }
}

module.exports= connectDb