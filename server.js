const express = require('express')
const connectDb = require('./database/db')
const Router = require('./routes/games-routes')

const app = express();

// app.use(express.json())
// app.use('/books', Router)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`server is connected and listening on port ${PORT} successfully`)})

connectDb();