const jwt = require ('jsonwebtoken')
const { JWT_SIGN } = require ('../config/jwt.js')

const otentikasiMiddleware = (req,res,next) => {
    const otHeader = req.headers.authorization
    

    if(!otHeader){
        res.status(401).json({
            error : 'Unauthorized'
        })
    } else {
        const token = otHeader.split(' ')[1]
        try{
            const decodedToken = jwt.verify(token, JWT_SIGN )

            next()
        }catch (error){
            res.status(400).jason({
                error : error.message
            })
        }
    }
}

module.exports = otentikasiMiddleware