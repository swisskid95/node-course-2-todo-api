// External libraries
const request = require('supertest')
const expect = require('expect')

// Import f0r local files
const { Todo } = require('./../models/todos')
const { app } = require('./../server')

const todos = [
  {
    text: 'Test todo text 1'
  },
  {
    text: 'Test todo text 2'
  }
]

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos)
    })
    .then(() => done())
})

describe('Post /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({ text })
      .expect(201)
      .expect(res => {
        expect(res.body.data.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1)
            expect(todos[0].text).toBe(text)
            done()
          })
          .catch(e => done(e))
      })
  })

  it('should not create todo with invalid request body', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2)
            done()
          })
          .catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos in database', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(2)
      })
      .end(done)
  })
})
