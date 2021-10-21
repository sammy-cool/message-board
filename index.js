const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 3033

app.use(cors())
app.use(express.json())

app.get('/messages', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            const messages = JSON.parse(data)
            res.json(messages)
        }
    })
})

app.post('/messages', (req, res) => {
    const body = {}
    body.id = Number(new Date())
    body.createdAt = new Date()
    body.body = req.body.body
   
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            const messages = JSON.parse(data)
            messages.push(body)
            fs.writeFile('./data.json', JSON.stringify(messages), () => {
                res.json(body)
            })
        }
    })
})

app.get('/messages/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            const messages = JSON.parse(data)
            const message = messages.find(message => message.id == id)
            if (message) {
                res.json(message)
            } else {
                res.json({})
            }
        }
    })
})

app.put('/messages/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            const messages = JSON.parse(data)
            const message = messages.find(message => message.id == id)
            if (message) {
                Object.assign(message, body)
                fs.writeFile('./data.json', JSON.stringify(messages), () => {
                    res.json(message)
                })
            } else {
                res.json({})
            }
        }
    })
})

app.delete('/messages/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err)
        } else {
            let messages = JSON.parse(data)
            const message = messages.find(message => message.id == id)
            messages = messages.filter(message => message.id != id)
            fs.writeFile('./data.json', JSON.stringify(messages), () => {
                res.json(message)
            })
        }
    })
})


app.listen(port, () => {
    console.log('listening on port', port)
})