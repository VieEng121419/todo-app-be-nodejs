import Todo from "../models/todoModel"
import { TodoType } from "../types";

class TodoRepository {
    async create(todoData: TodoType) {
        try {
            const todo = new Todo(todoData)
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
}

export default new TodoRepository();