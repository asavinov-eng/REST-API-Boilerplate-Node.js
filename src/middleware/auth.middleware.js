import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createHttpError(401, 'Unauthorized')
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    next(createHttpError(401, 'Invalid or expired token'))
  }
}

export default authenticate