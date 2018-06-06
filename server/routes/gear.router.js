const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // const user_id = req.user.id;
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = 1;`
    pool.query(queryText)
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});

router.post('/new-item', (req, res) => {
    console.log('POST /api/gear/new-gear')
    const newItem = req.body.newItem;
    const tripID = req.body.tripID
    console.log(tripID);
    const queryText = `INSERT INTO "user_trip_gear" ("description", "quantity", "trip_id")
    VALUES ($1, $2, $3);`;
    pool.query(queryText,
        [newItem.description,
        newItem.quantity,
    tripID])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error with POST /api/trip/new-trip', error);
            res.sendStatus(500);
        });
})

router.put('/join', (req, res) => {
    const user_id = req.user.id;
    let queryText = `UPDATE "user_trip" 
    SET "user_hasAccepted" = 'true'
    WHERE "user_id" = $1;`
    pool.query(queryText, [user_id])
        .then((result) => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error joining user to trip', error);
            res.sendStatus(500)
        });
});

module.exports = router;