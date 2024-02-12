import { users } from './DB.js'

export const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

export const findUserById = (userId) => {
  return users.find((user) => user.id === userId)
}