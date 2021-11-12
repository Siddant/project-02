/* eslint-disable no-console */
require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/dist`))
app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
  console.log(`API_KEY=${process.env.API_KEY}`)
  console.log(`MAPBOX_TOKEN=${process.env.MAPBOX_TOKEN}`)
})
