import express from 'express'
import jwt from 'jsonwebtoken'
const app = express()

const authenticate = app.use((req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' })
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            console.error(error.message)
            res.status(498)
            res.clearCookie('token')
            res.send({ message: 'Invalid token' })
        }
    }
})

export default authenticate