import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from './helpers';
import { users } from './DB';

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url!.split('/')[3];
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || !age) {
          sendResponse(res, 400, { message: 'Username and age are required' });
        } else {
          users[userIndex] = {
            ...users[userIndex],
            username,
            age,
            hobbies: hobbies || [],
          };
          sendResponse(res, 200, users[userIndex]);
        }
      } catch (error) {
        sendResponse(res, 400, { message: 'Invalid JSON' });
      }
    });
  } else {
    sendResponse(res, 404, { message: 'User not found' });
  }
};
