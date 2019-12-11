const express = require('express')
const url = require('url')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const fs = require('fs').promises



app.get('/', (req, res) => res.redirect("hello.html"))

app.get('/callback', (req, res) => {
    // console.log(req)
    // const urlObj = url.parse(req.url)
    // console.log(urlObj)
})

const getDate = () => {
    const dateObj = new Date()
    const month = dateObj.getMonth() + 1 // months from 1-12
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()

    return year + "/" + month + "/" + day
}

app.post('/popularity', jsonParser, async (request, response) => {
    const fileBuffer = await fs.readFile('data.json')
    const data = JSON.parse(fileBuffer)
    
    // Destructuring assignment?\/
    const { artistId, artistName, songPopularity } = request.body
    
    // If we haven't recorded any information for this artist yet,
    // create a new entry in the JSON object.
    if (!data[artistId]) {
        data[artistId] = {
            name: artistName,
            songPopularity: {},
        }
    }
    const date = getDate()
    // console.log(songPopularity)
    data[artistId].songPopularity[date] = songPopularity
    await fs.writeFile('data.json', JSON.stringify(data, null, 2))
    // console.log('Wrote data to file.')
    response.sendStatus(201)
})
app.get('/data', jsonParser, async(req, res) =>{
    const fileBuffer = await fs.readFile('data.json')
    const data = JSON.parse(fileBuffer)
    res.json(data)
    // console.log(data)
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
