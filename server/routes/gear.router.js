const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // const user_id = req.user.id;
    let queryText = `SELECT *
    FROM "gear" 
    JOIN "user_trip_gear" ON "user_trip_gear"."gear_id" = "gear"."id"
    WHERE "user_trip_gear"."trip_id" = 1;` 
    pool.query(queryText)
    .then((result) => {res.send(result.rows)})
    .catch((error) => {
        console.log('Error fetching trip gear', error);
        res.sendStatus(500)});
});

router.post('/new-trip', (req, res) => {
    console.log('POST /api/trip/new-trip')
    const newTrip = req.body;
    const queryText = `INSERT INTO "trip" ("name", "location", "meetup_time", "meetup_spot",
     "meetup_coordinates", "exit_time", "exit_spot", "exit_coordinates",
     "mapURL") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    pool.query(queryText, 
        [   newTrip.name,
            newTrip.location, 
            newTrip.meetup_time, 
            newTrip.meetup_spot, 
            newTrip.meetup_coordinates,
            newTrip.exit_time,
            newTrip.exit_spot,
            newTrip.exit_coordinates,
            newTrip.mapURL])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error with POST /api/trip/new-trip', error);
            res.sendStatus(500);
        });
})

router.put('/join', (req,res) => {
    const user_id = req.user.id;
    let queryText = `UPDATE "user_trip" 
    SET "user_hasAccepted" = 'true'
    WHERE "user_id" = $1;` 
    pool.query(queryText,[user_id])
    .then((result) => {res.sendStatus(200)})
    .catch((error) => {
        console.log('Error joining user to trip', error);
        res.sendStatus(500)});
});

module.exports = router;