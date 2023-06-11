# Backend-Task

This is a backend task project for performing various operations using Express.js and Sequelize with PostgreSQL.

Installation
To run this project locally, please ensure you have the following dependencies installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)

## Follow these steps to set up the project:

1. Clone the repository:

```
git clone <repository-url>
```

2. Navigate to the project directory:

```
cd backend-task
```

3. Install the dependencies:

```
npm install
```

4. Set up the environment variables:

- Create a .env file in the root directory of the project.
- Provide the necessary environment variables in the .env file, such as database connection details, port, etc. You can use the .env.example file as a reference.

5. Set up the PostgreSQL database:

- Create a PostgreSQL database.
- Update the .env file with the correct database connection details.

6. Run database migrations:

```
npx sequelize-cli db:migrate
```

7. Start the server:

```
npm start
```

- By default, the server will start on port 3000. You can access the API at http://localhost:3000.

## API Routes

The following routes are available in the API:

- POST /api/posts - Create a new post.
- GET /api/posts - Get all posts.
- GET /api/posts/:id - Get a specific post by ID.
- PUT /api/posts/:id - Update a post.
- DELETE /api/posts/:id - Delete a post.
- POST /api/posts/:id/reaction - Add a reaction to a post.

Please refer to the source code and documentation for more details on the API routes and request/response formats.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

Feel free to customize and expand the README file according to your project's specific requirements and additional information.

I hope this helps! Let me know if you have any further questions.
