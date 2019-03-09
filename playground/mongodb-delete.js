const { MongoClient } = require('mongodb')

MongoClient.connect(
  'mongodb://localhost:27017/todo-app',
  (error, db) => {
    if (error) {
      console.log('Unable to Connect to Database Local seerver')
    }

    // Delete many
    // db.collection('Todos')
    //   .deleteMany({ text: 'Get out' })
    //   .then(result => {
    //     console.log(result)
    //   })

    // Delete one
    // db.collection('Todos')
    //   .deleteOne({ text: 'Get in' })
    //   .then(result => {
    //     console.log(result)
    //   })

    // Find one and delete
    db.collection('Todos')
      .findOneAndDelete({ completed: false })
      .then(result => {
        console.log(result)
      })
  }
)
