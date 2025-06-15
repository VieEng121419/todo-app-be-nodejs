import Todo from "../models/todoModel";
import { TodoType } from "../types";

class TodoRepository {
  async create(todoData: TodoType) {
    try {
      const todo = new Todo(todoData);
      await todo.save();
      return todo;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const todos = await Todo.find();
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  }

  async update(id: string, updateData: Partial<TodoType>) {
    try {
      const todo = await Todo.findByIdAndUpdate(id, updateData, { new: true });
      if (!todo) {
        throw new Error("Todo not found");
      }
      return todo;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        throw new Error("Todo not found");
      }
      return todo;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  }
}

export default new TodoRepository();
