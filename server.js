import http from 'http'
import { sendResponse } from './helpers.js'
import { getUsers } from './get.js'
import { getUserById } from './get.js'
import { createUser } from './create.js'
import { updateUser } from './update.js'
import { deleteUser } from './delete.js'

export const server = http.createServer((req, res) => {
  const { method, url } = req
  const [, basePath, users, userId] = url.split('/')

  if (
    basePath === 'api' &&
    users === 'users' &&
    method === 'GET' &&
    url === '/api/users/'
  ) {
    getUsers(req, res)
  } else if (
    basePath === 'api' &&
    users === 'users' &&
    method === 'GET' &&
    userId !== undefined
  ) {
    getUserById(req, res)
  } else if (
    basePath === 'api' &&
    users === 'users' &&
    method === 'POST' &&
    url === '/api/users/'
  ) {
    createUser(req, res)
  } else if (
    basePath === 'api' &&
    users === 'users' &&
    method === 'PUT' &&
    userId !== undefined
  ) {
    updateUser(req, res)
  } else if (
    basePath === 'api' &&
    users === 'users' &&
    method === 'DELETE' &&
    userId !== undefined
  ) {
    deleteUser(req, res)
  } else {
    sendResponse(res, 404, { message: 'Endpoint not found' })
  }
})
