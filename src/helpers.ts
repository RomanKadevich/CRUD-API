import { ServerResponse } from 'http';
import { User } from './DB';

export const sendResponse = (
  res: ServerResponse,
  statusCode: number,
  data: any
): void => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const findUserById = (
  users: User[],
  userId: string
): User | undefined => {
  return users.find((user) => user.id === userId);
};
