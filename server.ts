
import express from "express";
import database from "./config/db";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });


// app.put("/api/todo/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, completed } = req.body;

//     if (!id || !title) {
//       return res.status(400).json({ message: "ID and title are required" });
//     }

//     if (title && title.trim() === "") {
//       return res.status(400).json({ message: "Title cannot be empty" });
//     }

//     const todo = await Todo.findByIdAndUpdate(id, { title, completed });

//     if (!todo) {
//       return res.status(404).json({ message: "Todo not found" });
//     }

//     await todo.save();

//     res.json(todo);
//   } catch (error) {
//     console.error("Error updating todo:", error);
//     res.status(500).json({ message: "Error updating todo" });
//   }
// });

// app.delete("/api/todo/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: "ID is required" });
//     }

//     const todo = await Todo.findByIdAndDelete(id);

//     if (!todo) {
//       return res.status(404).json({ message: "Todo not found" });
//     }

//     res.json({ message: "Todo deleted successfully" });
//   } catch (error) {
//     console.error("Error in delete route:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

app.use("/api/todo", router);

// app.use((error, req, res) => {
//   console.error(error);
//   res.status(500).json({ error: "Internal server error" });
// });

async function connectToDatabase() {
  try {
    await database.connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

connectToDatabase();
