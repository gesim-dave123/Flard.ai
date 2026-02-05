import express from "express"; //it handles get, post etc requests
import cors from "cors"; //CORS allows your frontend (React, Vite, etc.) to talk to this backend.
import dotenv from "dotenv"; //Loads environment variables from a .env file.
// import pool from "./config/db.js";  //This is your PostgreSQL connection pool.
import UserRoutes from "./routes/users.router.js";

const app = express();

dotenv.config();
// app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Be specific! No trailing slash.
    credentials: true, // Allow cookies/headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api/users", UserRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully 🚀" });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));

