const { ObjectID } = require('mongodb')
const mongoose = require('../server/db/mongoose')
const { Todo } = require('../server/models/todos')
const { User } = require('../server/models/users')

// const id = '5c8400a7c86f6a2bd4aa56f2'
const id = '5c83825a382ebf08ecb8eb2f'

// if (!ObjectID.isValid) {
//   return console.log('No todo with id: ' + id)
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('todos', todos)
// })

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('todo', todo)
// })

// Todo.findById(id)
//   .then(todo => {
//     console.log('Todo by id', todo)
//   })
//   .catch(e => console.log(e))

User.findById(id)
  .then(user => {
    if (!user) {
      console.log('user not found')
    }

    console.log('User by id: ', user)
  })
  .catch(e => console.log(e))
