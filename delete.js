import { sendResponse } from './helpers.js'
import { users } from './DB.js'

export const deleteUser = (req, res) => {
  const userId = req.url.split('/')[3]
  const userIndex = users.findIndex((user) => user.id === userId)
  if (userIndex !== -1) {
    users.splice(userIndex, 1)
    sendResponse(res, 204, { message: `User with id: ${userId} deletes` })
  } else {
    sendResponse(res, 404, { message: 'User not found' })
  }
}
