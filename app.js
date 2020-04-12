const express = require('express')
const bodyParser = require('body-parser')
const port = parseInt(process.env.PORT, 10) || 5000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
require('./routes.js')(app)

app.listen(port, err => {
  if (err) throw err
  console.log(`Ready on http://localhost:${port}`)
})
