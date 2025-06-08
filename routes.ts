import express, { Router } from "express";
import todoController from "./controllers/todoController.js";

const router = Router();

router.post("/api/todo", todoController.createTodo);

export default router;
