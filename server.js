require('dotenv').config()
const path = require('path')
const express = require('express')
const connectDb = require('./database/db')
const Router = require('./routes/games-routes')
const methodOverride = require('method-override')

const app = express();

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



app.use('/games', Router)



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`server is connected and listening at port ${PORT} successfully`)})

connectDb();