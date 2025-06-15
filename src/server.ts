import express from "express";
import database from "./config/db";
import router from "./routes";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/todo", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

// 404 handler (must come last before error handler)
app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    error: `Route ${req.originalUrl} not found`,
  });
});

// 500 handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Internal server error:", err.stack);
  res.status(500).json({
    status: 500,
    error: "Internal server error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

async function connectToDatabase() {
  try {
    await database.connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure
  }
}

connectToDatabase();
