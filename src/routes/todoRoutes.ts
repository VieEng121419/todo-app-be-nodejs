import { Router } from "express";
import todoController from "../controllers/todoController";
import authMiddleware from "../middleware";

export const todoRouter = Router();

todoRouter.post("/", authMiddleware, todoController.createTodo.bind(todoController));
todoRouter.get("/", authMiddleware, todoController.getTodos.bind(todoController));
todoRouter.put("/:id", authMiddleware, todoController.updateTodo.bind(todoController));
todoRouter.delete("/:id", authMiddleware, todoController.deleteTodo.bind(todoController));