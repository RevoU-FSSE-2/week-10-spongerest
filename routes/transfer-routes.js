const { Router } = require ('express')
const { getAllTransactions, createTransactions,approveTransfer } = require ('../services/transfer-service.js')
const otorisasiMiddleware = require('../middleware/otorisasi-middleware.js')

const trfRouter = Router()

trfRouter.get('/', getAllTransactions)
trfRouter.post('/add', createTransactions)
trfRouter.put('/:transferId',otorisasiMiddleware,approveTransfer)

module.exports=trfRouter