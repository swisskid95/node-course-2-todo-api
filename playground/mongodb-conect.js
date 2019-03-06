// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect(
  'mongodb://localhost:27017/todo-app',
  (error, db) => {
    if (error) {
      return console.log('Unable to connect to mongo db database')
    }

    console.log('connected to mongodb server')

    // db.collection('Todos').insertOne(
    //   {
    //     text: 'Finish the complete node course',
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       console.log('Could not insert document due to: ', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    //   }
    // )

    // db.collection('Users').insertOne(
    //   {
    //     name: 'Sanusi Babatunde',
    //     age: 24,
    //     Location: 'Lagos, Nigeria'
    //   },
    //   (err, result) => {
    //     if (err) {
    //       console.log('Could not insert cocument due to: ', err)
    //     }

    //     console.log(JSON.stringify(result.ops, null, 2))
    //   }
    // )

    db.close()
  }
)
