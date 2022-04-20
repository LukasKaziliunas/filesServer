const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const path = require('path');

app.use('/file', express.static(path.join(__dirname, 'public')))  //only for testing

app.use(cors())

app.get('/', (req, res) => {
    res.send("file server is working");
})

app.listen(port, () => {
  console.log(` files api ${port}`)
})

