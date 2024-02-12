import { IncomingMessage, ServerResponse } from 'http';
import { findUserById, sendResponse } from './helpers';
import { users } from './DB';
import { User } from './DB';

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  sendResponse(res, 200, users);
};

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const reqUrl = req.url ?? '';
  const userId = reqUrl.split('/')[3];
  const user: User | undefined = findUserById(users, userId);
  if (user) {
    sendResponse(res, 200, user);
  } else {
    sendResponse(res, 404, { message: 'User not found' });
  }
};
