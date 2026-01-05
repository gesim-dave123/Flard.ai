import pool from "./db.js";

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connection Successful!");
    console.log("Current Database Time:", res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection Failed!");
    console.error(err.message);
    process.exit(1);
  }
  t;
}

testConnection();
