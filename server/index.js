import express from "express";
import cors from "cors";
import "dotenv/config"; 
import pool from "./db.js"; 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database Connected!", time: result.rows[0] });
  } catch (err) {
    res.status(500).send("Database Error");
  }
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
