const { MongoClient } = require('mongodb')

MongoClient.connect(
  'mongodb://localhost:27017/todo-app',
  (error, db) => {
    if (error) {
      console.log('Unable to connect', error)
    }

    // db.collection('Todos')
    //   .find({ completed: false })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log('Todos:')
    //       console.log(JSON.stringify(docs, null, 2))
    //     },
    //     err => {
    //       console.log('Unable to fetch data', err)
    //     }
    //   )

    db.collection('Todos')
      .find()
      .count()
      .then(
        count => {
          console.log(`Todos count: ${count}`)
        },
        err => {
          console.log('Unable to fetch data', err)
        }
      )

    db.collection('Users')
      .find()
      .toArray()
      .then(
        docs => {
          console.log('Users')
          console.log(JSON.stringify(docs, null, 2))
        },
        err => {
          console.log('Unable to connect to database', err)
        }
      )

    db.collection('Users')
      .find()
      .count()
      .then(
        count => {
          console.log(`Users count: ${count}`)
        },
        err => {
          console.log('Unable to connect to Database', err)
        }
      )
  }
)
