require('dotenv').config()
const path = require('path')
const express = require('express')
const connectDb = require('./database/db')
const Router = require('./routes/games-routes')
const methodOverride = require('method-override')

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.static(path.join(__dirname, 'public')))
//configurate the style at the "public" folder

app.use(methodOverride('_method'))
//for sending "delete" and "put" methods in the EJS

app.use(express.urlencoded({ extended: true }));
//reading forms information

app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
//set EJS and views folder


app.use('/', Router)



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`server is connected and listening at port ${PORT} successfully`)})

connectDb();