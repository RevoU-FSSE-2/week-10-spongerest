const { JWT_SIGN } = require("../config/jwt.js")
const jwt = require('jsonwebtoken')


const otorisasiMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        res.status(401).json({
            error: 'Unauthorized'
        })
    }else {
        const token = authHeader.split(' ')[1]

        try{
            const decodedToken = jwt.verify(token, JWT_SIGN)
            if (decodedToken.role === 'admin') {
                next()
            }else{
                res.status(401).json({
                    error:'You are not admin MADAFAKA!'
                })
            }
        }catch (error) {
            res.status(400).json({
                error : error.message
            })
        }
    }
}

module.exports = otorisasiMiddleware