// scripts/check-db.js
import pool from "./src/db/db.js";

try {
  const response = await pool.query("select * from users");
  console.log("DB connection succeeded:", response);
} catch (err) {
  console.error("DB connection failed:", err.message);
} finally {
  await pool.end();
}
