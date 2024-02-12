CRUD-API app

Usage

Development Mode

To run the application in development mode, use the following npm script:

bash
Copy code:

npm run start:dev

This will start the server using nodemon, which will automatically restart the server whenever changes are detected in the source code.




API Endpoints
The following endpoints are available in the API:

GET /api/users: Retrieve all users.
GET /api/users/{userId}: Retrieve a specific user by ID.
POST /api/users: Create a new user.
PUT /api/users/{userId}: Update an existing user by ID.
DELETE /api/users/{userId}: Delete a user by ID.
Environment Configuration
Ensure to create a .env file in the root directory of the project and set the following environment variables:

env
Copy code
PORT=4000
Replace 4000 with the desired port number on which you want the application to run.

Data Structure
The users are stored in the application in the following format:

json
Copy code
{
  "id": "unique_id",
  "name": "user_name",
  "email": "user_email",
  "age": "user_age"
}