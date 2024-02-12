import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from './helpers';
import { users, User } from './DB';

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const reqUrl = req.url ?? '';
  const userId = reqUrl.split('/')[3];
  const userIndex = users.findIndex((user: User) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    sendResponse(res, 204, { message: `User with id: ${userId} deleted` });
  } else {
    sendResponse(res, 404, { message: 'User not found' });
  }
};
