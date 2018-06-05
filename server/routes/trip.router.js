const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    const user_id = req.params.id;
    let queryText = `SELECT *
    FROM "trip" 
    JOIN "user_trip" ON "trip"."id" = "user_trip"."trip_id"
    WHERE "user_trip"."user_id" = $1;` 
    pool.query(queryText,[user_id])
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
        console.log('Error fetching user trips', error);
        res.sendStatus(500)});
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;