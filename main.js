const express = require('express')
const url = require('url')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const fs = require('fs').promises



app.get('/', (req, res) => res.send('Hello World!'))

app.get('/callback', (req, res) => {
    console.log(req)
    // const urlObj = url.parse(req.url)
    // console.log(urlObj)
})

const getDate = () => {
    const dateObj = new Date()
    const month = dateObj.getUTCMonth() + 1 //months from 1-12
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()

    return year + "/" + month + "/" + day
}

app.post('/popularity', jsonParser, async (request, response) => {
    const fileBuffer = await fs.readFile('data.json')
    const data = JSON.parse(fileBuffer)
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
    console.log(songPopularity)
    data[artistId].songPopularity[date] = songPopularity
    await fs.writeFile('data.json', JSON.stringify(data, null, 2))
    response.sendStatus(201)
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
