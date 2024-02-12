import { v4 } from 'uuid'
import { sendResponse } from './helpers.js'
import { users } from './DB.js'

export const createUser = (req, res) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body)
      if (!username || !age) {
        sendResponse(res, 400, { message: 'Username and age are required' })
      } else {
        const newUser = {
          id: v4(),
          username,
          age,
          hobbies: hobbies || [],
        }
        users.push(newUser)
        sendResponse(res, 201, newUser)
      }
    } catch (error) {
      sendResponse(res, 400, { message: 'Invalid JSON' })
    }
  })
}
