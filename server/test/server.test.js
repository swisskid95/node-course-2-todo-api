// External libraries
const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

// Import f0r local files
const { Todo } = require('./../models/todos')
const { app } = require('./../server')

const todos = [
  {
    _id: new ObjectID(),
    text: 'Test todo text 1'
  },
  {
    _id: new ObjectID(),
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

describe('Get /todos/:id', () => {
  it('should return todo doc with id specified', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.data.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return a 404', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return a 404 error code for non-object generated ID', done => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  })
})
