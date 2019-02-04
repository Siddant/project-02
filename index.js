const express = require('express')

const app = express()

app.use(express.static(`${__dirname}/dist`))
app.get('/*',(req, res) => res.sendFile(`${__dirname}/dist/index.html`))

app.listen(4000, ()=> console.log('express is serving the dist folder on port 4000'))
