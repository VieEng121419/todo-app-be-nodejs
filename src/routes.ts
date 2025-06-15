import { Router } from "express";
import todoController from "./controllers/todoController";

const router = Router();

router.post("/", todoController.createTodo.bind(todoController));
router.get("/", todoController.getTodos.bind(todoController));
router.put("/:id", todoController.updateTodo.bind(todoController));
router.delete("/:id", todoController.deleteTodo.bind(todoController));

export default router;
