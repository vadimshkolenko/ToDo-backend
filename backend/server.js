const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: ".env" })

// const DB = `mongodb+srv://vadim:${process.env.DATABASE_PASSWORD}@cluster0-omjwr.mongodb.net/test?retryWrites=true&w=majority`
const DB = process.env.MONGODB_URI

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected successfully to server"))
  .catch(err => console.log(err))

const port = process.env.PORT || 5000 
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})