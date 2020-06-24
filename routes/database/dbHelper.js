require('dotenv').config();

const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function QUERY(query, values=[]) {
  try {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  QUERY
};
