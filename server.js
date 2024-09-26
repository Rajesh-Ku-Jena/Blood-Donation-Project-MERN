const express= require('express')
const dotenv= require('dotenv')
const morgan= require('morgan')
const colors= require('colors')
const cors= require('cors')
const connectDb = require('./config/db')

dotenv.config()

const app= express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

connectDb();
// routes 
app.use('/api/v1/', require('./routes/testRoute'))
app.use('/api/v1/auth', require('./routes/authRoute'))
app.use('/api/v1/inventory', require('./routes/inventoryRoute'))




const PORT=process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server is running on PORT: ${PORT}`.bgBlue.white)
})