# ToDoApp-BE

A simple backend API for managing to-do tasks.

## Features

- User authentication (register/login)
- CRUD operations for to-do items
- RESTful API design
- Data persistence with a database

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

```bash
git clone https://github.com/yourusername/ToDoApp-BE.git
cd ToDoApp-BE
npm install
```

### Configuration

Create a `.env` file in the root directory:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret
```

### Running the App

```bash
npm start
```

## API Endpoints

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| POST   | /auth/register   | Register new user       |
| POST   | /auth/login      | User login              |
| GET    | /todos           | Get all to-dos          |
| POST   | /todos           | Create a new to-do      |
| PUT    | /todos/:id       | Update a to-do          |
| DELETE | /todos/:id       | Delete a to-do          |

## License

MIT
