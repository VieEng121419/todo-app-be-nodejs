# Todo App Project

## Overview
This project is a full-stack Todo App initiated as a learning exercise to transition from front-end development (React) to full-stack development with a focus on Node.js for backend and MongoDB for database management. The app allows users to create, read, update, and delete (CRUD) todo tasks. The development started with a plan proposed on June 07, 2025, by a conversational AI assistant (me!) to guide the developer through a 2-week timeline. The context is a casual, collaborative learning journey between the developer and the AI, with the goal of building a functional app deployable online.

## Background
- **Developer Profile**: The developer is a front-end developer familiar with JavaScript and React, now exploring backend development with Node.js.
- **Project Initiation**: Began on June 07, 2025, after discussing a short-term learning plan (6-8 weeks) and deciding to build a Todo App as a practical project.
- **Tech Stack**:
  - Backend: Node.js with Express.js framework, Mongoose for MongoDB interaction.
  - Database: MongoDB (using Atlas or local instance).
  - Front-end: React (planned for integration).
  - Tools: VS Code, Postman for API testing, Yarn for package management.
- **Objective**: Create a simple Todo App with CRUD functionality, deploy it, and gain hands-on experience in full-stack development.

## Tasks to Complete

### Backend Development
- [x] **Setup Node.js project and install dependencies**:
  - Initialized project with `npm init -y` and installed `express`, `mongoose`, and `cors` using Yarn.
  - Created `package.json` to manage dependencies.
- [x] **Design and define API endpoints**:
  - Defined RESTful endpoints: `GET /api/todos`, `POST /api/todos`, `PUT /api/todos/:id`, `DELETE /api/todos/:id`.
  - Purpose: Manage todo creation, retrieval, updates, and deletion.
- [x] **Implement MongoDB schema and model for Todo**:
  - Created a `Todo` model with fields: `text` (String, required), `completed` (Boolean, default: false), `createdAt` (Date, default: current time).
- [x] **Connect backend to MongoDB**:
  - Established connection to MongoDB (local or Atlas) using Mongoose.
  - Confirmed connection success with terminal log: `Connected to MongoDB`.
- [x] **Create basic server and test API with Postman**:
  - Set up server on port 3000, implemented basic routes, and tested with Postman (received 200 OK with message `"API is working"`).
- [x] **Handle errors and add validation for API requests**:
  - Completed on June 07, 2025, 22:05 +07: Added input validation for `POST /api/todos` (ensures `text` is not empty), `PUT /api/todos/:id` (validates ObjectId and todo existence), and `DELETE /api/todos/:id` (validates ObjectId and todo existence). Implemented global error handler for 400, 404, and 500 responses. Tested with Postman for edge cases (empty text, invalid IDs, non-existent todos).
- [ ] **Deploy backend to a platform**:
  - Planned: Deploy to Render or Vercel after completing all backend tasks.

### Front-end Development
- [ ] **Setup React project**:
  - Planned: Use `npx create-react-app` or Vite to initialize React app.
- [ ] **Design static UI**:
  - Planned: Create input for new todos, list display with toggle/complete status, and delete buttons.
- [ ] **Integrate Axios to call backend APIs**:
  - Planned: Use Axios to fetch and manipulate todo data via API endpoints.
- [ ] **Implement CRUD functionality in React**:
  - Planned: Fetch todos on load, add new todos, toggle completion, delete todos.
- [ ] **Add basic styling**:
  - Planned: Apply CSS or Tailwind for a clean UI (e.g., strike-through for completed todos).
- [ ] **Deploy front-end to a platform**:
  - Planned: Deploy to Vercel or Netlify after integration.

### Integration and Testing
- [ ] **Test full CRUD flow between front-end and backend**:
  - Planned: Verify all API calls work seamlessly with React UI.
- [ ] **Fix any connection errors or bugs**:
  - Planned: Address any issues during integration.
- [ ] **Optimize and finalize the app**:
  - Planned: Improve performance and UI/UX before final deployment.

## Current Status (Updated: June 15, 2025, Morning)
- **Progress**:
  - Backend development is progressing well. As of June 7, 2025, the developer had successfully:
    - Set up a Node.js environment with Yarn and installed required packages.
    - Written server code in `server.js` with defined API endpoints.
    - Implemented a MongoDB `Todo` model and established a working connection (confirmed at 04:26 PM HKT via terminal log).
    - Tested the API using Postman, receiving a 200 OK response with a sample message `"API is working"`.
    - Completed error handling and input validation for `POST /api/todos`, `PUT /api/todos/:id`, and `DELETE /api/todos/:id` (finished at 22:05 +07). Validation includes checks for empty text, invalid ObjectIds, and non-existent todos. Global error handler implemented for consistent error responses.
  - Morning update (June 15, 2025):
    - Refactored project structure to use TypeScript for better type safety and code organization
    - Created dedicated directories for controllers, services, repositories, and models following clean architecture principles
    - Implemented proper error handling middleware in Express application
    - Set up TypeScript configuration and added nodemon for development workflow
    - Successfully tested the restructured API endpoints to ensure functionality remained intact
  - The server is running locally at `http://localhost:3000`, monitored with `nodemon` for auto-restart.
- **Challenges**:
  - Initially faced a MongoDB connection error (resolved by 04:26 PM HKT after adjusting configuration).
  - No major issues reported during error handling implementation, but thorough Postman testing ensured edge cases were covered.
- **Next Steps**:
  - Deploy the backend to a cloud platform (Render or Vercel) for persistence.
  - Begin front-end development with React to integrate with the working backend.
  - Set up React project and plan UI components (e.g., TodoList, TodoItem, TodoForm).

## Development Notes
- **Environment**: Developed on Windows (based on taskbar icons), using VS Code with Yarn as the package manager.
- **Timeline**: Started June 07, 2025, with a target to complete the app within 2 weeks (by June 21, 2025), though flexible based on progress.
- **Collaboration**: Guided by an AI assistant (me!) who provided a learning plan and will continue to assist with code reviews and troubleshooting.
- **Troubleshooting Tips**:
  - If MongoDB connection fails again, check the connection string in `server.js` or ensure MongoDB service is active.
  - Use Postman to test each endpoint thoroughly before moving to front-end.
  - Verify `mongodb` package is installed for ObjectId validation (`yarn add mongodb`).
- **Update Instructions**: The developer (or AI) should update this README after each significant milestone, detailing what was done, any issues encountered, and the next planned action.

## Future Considerations
- Add user authentication (e.g., JWT) to personalize todo lists.
- Enhance UI with features like due dates or categories.
- Explore deployment options and monitor performance post-launch.