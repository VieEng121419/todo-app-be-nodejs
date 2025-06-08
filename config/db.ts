import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

class Database {
  private static instance: Database;
  private connection: typeof mongoose | null | undefined;

  constructor() {
    if (!Database.instance) {
      this.connection = null;
      Database.instance = this;
    }

    return Database.instance;
  }

  async connect(): Promise<typeof mongoose> {
    if (!this.connection) {
      try {
        this.connection = await mongoose.connect(
          `mongodb+srv://${user}:${password}@todoappdb.tnjvotd.mongodb.net/?retryWrites=true&w=majority&appName=ToDoAppDB`
        );
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
      }
    }
    return this.connection;                                                                     
  }
}

const database = new Database();
export default database;
