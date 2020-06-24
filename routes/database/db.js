var express = require('express');
var router = express.Router();
// require('dotenv').config();
//
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
//
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const _db_ = require('./dbHelper');

router.get('/test_table', async function(req, res, next) {
  const results = await _db_.QUERY(
    'SELECT * FROM test_table'
  );
  res.send(results.rows);
});

router.post('/add_to_test_table', async function(req, res, next) {
  const results = await _db_.QUERY(
    'INSERT INTO test_table VALUES ($1, $2)',
    [req.body.id, req.body.name]
  );
  res.status(201).json({ status: 'success', message: 'entry added.' });
});

// router.get('/test_table', async function(req, res, next) {
//   try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM test_table');
//     	res.send(result.rows);
//       client.release();
//   } catch (err) {
//       console.error(err);
//       return err;
//   }
// });

module.exports = router;
