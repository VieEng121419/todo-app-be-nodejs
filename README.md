# ToDoApp-BE

A robust backend API for managing to-do tasks with comprehensive user authentication and authorization.

## Features

- **User Authentication & Authorization**
  - User registration and login
  - JWT access tokens (15 minutes) and refresh tokens (7 days)
  - Automatic token refresh and rotation for enhanced security
  - Multiple device support with individual session management
  - Secure logout (single device and all devices)
  - Password hashing with bcrypt

- **Todo Management**
  - CRUD operations for to-do items
  - User-specific todos (coming soon)
  - Input validation and error handling

- **Architecture & Code Quality**
  - TypeScript for type safety
  - Clean architecture: Controller → Service → Repository pattern
  - Singleton design patterns
  - Comprehensive error handling middleware
  - RESTful API design

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) with refresh token rotation
- **Security**: bcryptjs for password hashing
- **Development**: Nodemon for auto-restart, TypeScript compilation

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local installation or MongoDB Atlas)
- Yarn or npm package manager

### Installation

```bash
git clone https://github.com/yourusername/ToDoApp-BE.git
cd ToDoApp-BE
yarn install
# or
npm install
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
MONGODB_URI=mongodb://localhost:27017/todoapp

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Security
BCRYPT_SALT_ROUNDS=12

# Server
PORT=3000
NODE_ENV=development
```

### Running the App

**Development mode (with auto-restart):**
```bash
yarn dev
# or
npm run dev
```

**Production mode:**
```bash
yarn build
yarn start
# or
npm run build
npm start
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint              | Description                    | Auth Required |
|--------|-----------------------|--------------------------------|---------------|
| POST   | `/api/auth/register`  | Register new user              | No            |
| POST   | `/api/auth/login`     | User login                     | No            |
| POST   | `/api/auth/refresh`   | Refresh access token           | No            |
| GET    | `/api/auth/me`        | Get current user info          | Yes           |
| POST   | `/api/auth/logout`    | Logout (current device)        | Yes           |
| POST   | `/api/auth/logout-all`| Logout from all devices        | Yes           |

### Todo Endpoints

| Method | Endpoint         | Description             | Auth Required |
|--------|------------------|-------------------------|---------------|
| GET    | `/api/todos`     | Get all user todos      | Yes           |
| POST   | `/api/todos`     | Create a new todo       | Yes           |
| PUT    | `/api/todos/:id` | Update a todo           | Yes           |
| DELETE | `/api/todos/:id` | Delete a todo           | Yes           |

### Request/Response Examples

**Register User:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Authenticated Requests:**
```bash
GET /api/auth/me
Authorization: Bearer your_access_token_here
```

## Project Structure

```
src/
├── server.ts              # Application entry point
├── config/
│   └── db.ts              # Database configuration
├── controllers/           # HTTP request handlers
│   ├── authController.ts
│   └── todoController.ts
├── services/              # Business logic layer
│   ├── authService.ts
│   └── todoService.ts
├── repositories/          # Data access layer
│   ├── authRepository.ts
│   └── todoRepository.ts
├── models/                # Database schemas
│   ├── authModel.ts
│   └── todoModel.ts
├── middleware/            # Custom middleware
│   └── index.ts
├── routes/                # Route definitions
│   ├── authRoutes.ts
│   ├── todoRoutes.ts
│   └── index.ts
└── types/                 # TypeScript type definitions
    └── index.ts
```

## Security Features

- **Password Security**: Passwords are hashed using bcrypt with configurable salt rounds
- **JWT Tokens**: Separate access and refresh tokens with different expiration times
- **Token Rotation**: Refresh tokens are automatically rotated on each use
- **HttpOnly Cookies**: Refresh tokens can be stored in secure, httpOnly cookies
- **Multiple Sessions**: Users can be logged in on multiple devices simultaneously
- **Secure Logout**: Tokens are properly invalidated on logout

## Development

This project follows clean architecture principles with clear separation of concerns:

- **Controllers**: Handle HTTP requests/responses and validation
- **Services**: Contain business logic and orchestrate data flow
- **Repositories**: Handle database operations and data persistence
- **Models**: Define data structures and database schemas

## Error Handling

The API provides consistent error responses in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] User-specific todos implementation
- [ ] Todo categories and priorities
- [ ] Due dates for todos
- [ ] Email verification for user registration
- [ ] Password reset functionality
- [ ] API rate limiting
- [ ] Comprehensive test suite
- [ ] API documentation with Swagger/OpenAPI
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
