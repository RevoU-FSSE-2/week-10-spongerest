const {MongoClient} = require('mongodb')

const databaseMiddleware = async(req,res,next) => {
    const mongoClient = await new MongoClient('mongodb://127.0.0.1:27017').connect()
    db = mongoClient.db('cashflow-2')

    req.db = db

    next()
}

module.exports = databaseMiddleware


























// const express = require('express')
// const { MongoClient, ObjectId } = require('mongodb')
// const userRouter = require('./routes/user-routes')
// const transactionRouter = require('./routes/transaction-routes')


// const app = express()


// app.use(async(req,res,next) => {
//     let db
//     try {
//         const client = await new MongoClient('mongodb://127.0.0.1:27017').connect()
//             db = client.db('cashflow')
//     } catch (error) {
//     console.log(error, `<=================== error ==================`);
//     }
    
//     req.db = db

//     next()
// })


// app.use(express.json())


// app.get('/', (req,res) => {
//     res.send('Halaman Utama Cashflow')
// })

// app.use('/users',userRouter)
// app.use('/transaction',transactionRouter)

// const port = 5000
// app.listen(port, () => {
//     console.log(`APP Running on port http://localhost:${port}`)
// })