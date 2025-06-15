import { Request, Response } from "express";
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

      return res.status(201).json({ message: "Todo created", todo });
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

  async updateTodo(req: Request, res: Response) {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      if (!id || !title) {
        return res.status(400).json({ message: "ID and title are required" });
      }

      if (title && title.trim() === "") {
        return res.status(400).json({ message: "Title cannot be empty" });
      }

      const todo = await TodoService.findByIdAndUpdate(id, { title, completed });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      await todo.save();

      res.json(todo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Error updating todo" });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      const deletedTodo = await TodoService.deleteTodo(id);

      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      return res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting todo" });
    }
  }
}

export default new TodoController();
