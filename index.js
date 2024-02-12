import http from "http";
import { v4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

let users = [
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    username: "example_user",
    age: 25,
    hobbies: ["reading", "painting", "hiking"],
  },
];
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const findUserById = (userId) => {
  return users.find((user) => user.id === userId);
};

const getUsers = (req, res) => {
  sendResponse(res, 200, users);
};

const getUserById = (req, res) => {
  const userId = req.url.split("/")[3];
  const user = findUserById(userId);
  if (user) {
    sendResponse(res, 200, user);
  } else {
    sendResponse(res, 404, { message: "User not found" });
  }
};

const createUser = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || !age) {
        sendResponse(res, 400, { message: "Username and age are required" });
      } else {
        const newUser = {
          id: v4(),
          username,
          age,
          hobbies: hobbies || [],
        };
        users.push(newUser);
        sendResponse(res, 201, newUser);
      }
    } catch (error) {
      sendResponse(res, 400, { message: "Invalid JSON" });
    }
  });
};

const updateUser = (req, res) => {
  const userId = req.url.split("/")[3];
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || !age) {
          sendResponse(res, 400, { message: "Username and age are required" });
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
        sendResponse(res, 400, { message: "Invalid JSON" });
      }
    });
  } else {
    sendResponse(res, 404, { message: "User not found" });
  }
};

const deleteUser = (req, res) => {
  const userId = req.url.split("/")[3];
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    sendResponse(res, 204,{ message: `User with id: ${userId} deletes` });
  } else {
    sendResponse(res, 404, { message: "User not found" });
  }
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const [, basePath, users, userId] = url.split("/");

  if (
    basePath === "api" &&
    users === "users" &&
    method === "GET" &&
    url === "/api/users/"
  ) {
    getUsers(req, res);
  } else if (
    basePath === "api" &&
    users === "users" &&
    method === "GET" &&
    userId !== undefined
  ) {
    getUserById(req, res);
  } else if (
    basePath === "api" &&
    users === "users" &&
    method === "POST" &&
    url === "/api/users/"
  ) {
    createUser(req, res);
  } else if (
    basePath === "api" &&
    users === "users" &&
    method === "PUT" &&
    userId !== undefined
  ) {
    updateUser(req, res);
  } else if (
    basePath === "api" &&
    users === "users" &&
    method === "DELETE" &&
    userId !== undefined
  ) {
    deleteUser(req, res);
  } else {
    sendResponse(res, 404, { message: "Endpoint not found" });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
