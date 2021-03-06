const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const userRouter = require('./routers/user')
const todolistRouter = require('./routers/todolist');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connection.openUri(process.env.MONGO_URL, (err) => {
  if(err) console.log(err);

    console.log('connect');

  })

app.use('/api/user', userRouter)
app.use('/api/todolist', todolistRouter)


app.listen(80, () => {
  console.log("server jalan di port 3000...");
})
