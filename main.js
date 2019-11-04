const express = require('express')
const url = require('url')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/callback', (req, res) => {
    console.log(req)
    // const urlObj = url.parse(req.url)
    // console.log(urlObj)
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
