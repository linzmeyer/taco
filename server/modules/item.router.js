/* jslint node: true */
const express = require('express');
const router = express.Router();
const pool = require('./pool');

/*******************************************************************************
*** POSTS / GETS ***************************************************************
*******************************************************************************/

// Add a item to the database
// Expects a item object on the request body with
// properties for "title", "author", "published"
router.post('/', (req, res) => {
  let item = req.body;
  console.log( 'Adding item', item );

  let sqlText = `INSERT INTO "items" ("title", "author", "published") VALUES ($1, $2, $3);`;
  pool.query(sqlText, [item.title, item.author, item.published])
    .then( (response) => {
      res.sendStatus(201);
    })
    .catch( (error) => {
      console.log('Failed to insert new item', item);
      console.log(error);
      res.sendStatus(500);
    });
});

// Get all items from the database
// Expects a item object on the request body with
// properties for "title", "author", "published"
router.get('/', (req, res) => {
  // Get the items from the database
  pool.query('SELECT * FROM "items" ORDER BY "author";')
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error getting all items`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
