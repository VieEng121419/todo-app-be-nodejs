import TodoRepository from "../repositories/todoRepository";
import { TodoType } from "../types";

class TodoService {
  async addTodo(todoData: TodoType) {
    return await TodoRepository.create(todoData);
  }

  async getAllTodos() {
    return await TodoRepository.getAll();
  }

  async findByIdAndUpdate(id: string, updateData: Partial<TodoType>) {
    return TodoRepository.update(id, updateData);
  }

  async deleteTodo(id: string) {
    return TodoRepository.delete(id);
  }
}

export default new TodoService();
