import { findUserById, sendResponse } from './helpers.js'
import { users } from './DB.js'

export const getUsers = (req, res) => {
  sendResponse(res, 200, users)
}

export const getUserById = (req, res) => {
  const userId = req.url.split('/')[3]
  const user = findUserById(userId)
  if (user) {
    sendResponse(res, 200, user)
  } else {
    sendResponse(res, 404, { message: 'User not found' })
  }
}
