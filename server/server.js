// External Imports
const express = require('express')
const bodyParser = require('body-parser')

// Local Imports
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todos')
const { User } = require('./models/users')

const app = express()

app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: 'Welcome to the Home page of the Todo app'
  })
})

app.post('/todos', (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  })

  newTodo.save().then(
    doc => {
      res.status(201).send({
        status: 201,
        data: doc
      })
    },
    e => {
      res.status(400).send({
        status: 400,
        error: e
      })
    }
  )
})

app.listen(port, () => {
  console.log(`Server Started and listening on port: ${port}`)
})
