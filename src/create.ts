import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { sendResponse } from './helpers';
import { users } from './DB';

export const createUser = (req: IncomingMessage, res: ServerResponse): void => {
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
        const newUser = {
          id: uuidv4(),
          username,
          age,
          hobbies: hobbies || [],
        };
        users.push(newUser);
        sendResponse(res, 201, newUser);
      }
    } catch (error) {
      sendResponse(res, 400, { message: 'Invalid JSON' });
    }
  });
};
