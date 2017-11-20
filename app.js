const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRouter = require('./routers/user')
const todolistRouter = require('./routers/todolist');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/user', userRouter)
app.use('/api/todolist', todolistRouter)


app.listen(3000, () => {
  console.log("server jalan di port 3000...");
})
