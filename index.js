const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

let songs = [
  {
    "id": 1,
    "name": "Volcán",
    "album": "Volcán"
  },
  {
    "id": 2,
    "name": "Signos",
    "album": "Signos"
  },

]

app.get('/', (request, response)=>{
response.send('<h1>hola hola</h1>')
})

app.get('/api/music', (request, response)=>{
    response.json(songs)
    })
    
app.get('/api/music/:id', (request, response)=>{
    const id = Number(request.params.id)
    const song = songs.find(song => song.id === id)
    if(song){
        response.json(song)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/music/:id', (request, response)=>{
    const id = request.params.id
    const song = songs.filter(song => song.id !== id)
    response.status(204).end()
})

app.post('/api/music/', (request, response)=>{
  const song = request.body
  if(!song || !song.name){
    return response.status(400).json({
      error:'song.name is missing'
    })
  }



    const ids = songs.map(song => song.id)
    const maxId = Math.max(...ids)
    const newSong = {
        id: maxId + 1,
        name:song.name,
        album:song.album
    }
    songs = [...songs, newSong]
    response.status(201).json(song)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
