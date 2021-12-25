const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.connect().then((client) => {
  return client
    .query(
      "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(300), email VARCHAR(300));"
    )
    .then((res) => {
      client.release();
    })
    .catch((e) => console.log(e));
});

module.exports = { pool };
