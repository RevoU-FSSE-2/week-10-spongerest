require('dotenv').config()
const express = require('express')
const databaseMiddleware = require('./middleware/database-middleware.js')
const authRouter = require('./routes/auth-routes.js')
const trfRouter = require('./routes/transfer-routes.js')
const otentikasiMiddleware = require('./middleware/otentikasi-middleware.js')
const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml')
const fs = require('fs')
const OpenApiValidator = require('express-openapi-validator');

const openApiPath = './doc/openapi.yaml'
const file = fs.readFileSync(openApiPath, 'utf-8')
const swaggerDocument = yaml.parse(file)

const app = express()

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(OpenApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true,
}));

app.use(databaseMiddleware)

app.get('/', (req,res) => {
    res.send('Halaman Utama')
})
app.use('/auth' , authRouter)
app.use('/transaction', trfRouter)

app.use((err,req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors
    });
})

app.listen(5000, () => {
    console.log('Server Running on Port 5000')
})