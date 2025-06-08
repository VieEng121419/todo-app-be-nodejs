import TodoRepository from "../repositories/todoRepository";
import { TodoType } from "../types";

class TodoService {
  async addTodo(todoData: TodoType) {
    return await TodoRepository.create(todoData);
  }

    async getAllTodos() {
        return await TodoRepository.getAll();
    }
}

export default new TodoService();
