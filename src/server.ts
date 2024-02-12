import http, { Server, IncomingMessage, ServerResponse } from 'http';
import { getUserById, getUsers } from './get';
import { createUser } from './create';
import { updateUser } from './update';
import { deleteUser } from './delete';
import { sendResponse } from './helpers';


export const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    const [, basePath, users, userId] = url?.split('/') ?? [];

    if (
      basePath === 'api' &&
      users === 'users' &&
      method === 'GET' &&
      url === '/api/users/'
    ) {
      getUsers(req, res);
    } else if (
      basePath === 'api' &&
      users === 'users' &&
      method === 'GET' &&
      userId !== undefined
    ) {
      getUserById(req, res);
    } else if (
      basePath === 'api' &&
      users === 'users' &&
      method === 'POST' &&
      url === '/api/users/'
    ) {
      createUser(req, res);
    } else if (
      basePath === 'api' &&
      users === 'users' &&
      method === 'PUT' &&
      userId !== undefined
    ) {
      updateUser(req, res);
    } else if (
      basePath === 'api' &&
      users === 'users' &&
      method === 'DELETE' &&
      userId !== undefined
    ) {
      deleteUser(req, res);
    } else {
      sendResponse(res, 404, { message: 'Endpoint not found' });
    }
  }
);
