import { Request, Response } from 'express';
import TodoService from "../services/todoService";

class TodoController {
  async createTodo(req: Request, res: Response) {
    const { title } = req.body;

    try {
      if (title && title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
      }

      const newTodo = {
        title: title,
        completed: false,
        createdAt: new Date(),
      };

      const todo = await TodoService.addTodo(newTodo);

      return res.status(201).json("Todo created", todo);

    } catch (error) {
      return res.status(500).json({ message: "Error creating todo" });
    }
  }

  async getTodos(req: Request, res: Response) {
    try {
      const todos = await TodoService.getAllTodos();
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching todos" });
    }
  }
}

export default new TodoController();
