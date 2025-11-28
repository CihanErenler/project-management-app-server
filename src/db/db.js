import pg from "pg";
import appConfig from "../../app.config.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: appConfig.pgConnectionString,
});

export default pool;
