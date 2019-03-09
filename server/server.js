// External Imports
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

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

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.status(200).json({
        status: 200,
        data: todos
      })
    },
    err => {
      rest.status(400).json({
        status: 400,
        error: err
      })
    }
  )
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).json({
          status: 404,
          error: 'Todo not found'
        })
      }

      res.status(200).json({
        status: 200,
        data: todo
      })
    })
    .catch(e => {
      res.status(400).send()
    })
})

app.listen(port, () => {
  console.log(`Server Started and listening on port: ${port}`)
})

module.exports = { app }
