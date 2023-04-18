import express, { response } from 'express'

const app = express()

app.get('/', (req, res) => {
    return response.json({ message: ' Hello '})
})

app.listen(3333, () => {
    console.log('Server started')
})