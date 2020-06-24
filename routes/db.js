var express = require('express');
var router = express.Router();
require('dotenv').config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

router.get('/test_table', async function(req, res, next) {
  try {
    // res.send('hii');

      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
    	res.send(result.rows);
      client.release();
  } catch (err) {
      console.error(err);
      return err;
  }
});

module.exports = router;
