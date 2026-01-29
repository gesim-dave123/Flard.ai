import express from "express"; //it handles get, post etc requests
import cors from "cors"; //CORS allows your frontend (React, Vite, etc.) to talk to this backend.
import dotenv from "dotenv"; //Loads environment variables from a .env file.
// import pool from "./config/db.js";  //This is your PostgreSQL connection pool.
import UserRoutes from "./routes/users.router.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());



app.use("/api/users", UserRoutes);



// app.get("/test-db", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     res.json({ message: "Database Connected!", time: result.rows[0] });
//   } catch (err) {
//     res.status(500).send("Database Error");
//   }
// });

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));

