const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */

// add user to trip's list of users
router.post('/add-user-to-trip', (req, res) => {
    console.log(req.body);
    console.log(req.body.inviteeUserID);
    const trip_id = req.body.trip_id;
    console.log(trip_id);
    // handle request from user to add other users
    if (req.body.inviteeUserID !== '' && req.body.inviteeUserID !== null && req.body.inviteeUserID !== undefined) {
        console.log('inviting other user');
        let user_id = req.body.inviteeUserID;
        console.log(user_id);
        let queryText = `INSERT INTO "user_trip" 
    ("trip_id", "user_id")
    VALUES ($1,$2);`
        pool.query(queryText, [trip_id, user_id])
            .then((result) => { res.sendStatus(200) })
            .catch((error) => {
                console.log('Error joining user to trip', error);
                res.sendStatus(500)
            });
        // upon creating new trip, add trip creator to the trip
    } else {
        console.log('adding trip creator to trip');
        let user_id = req.user.id;
        let hasAccepted = true;
        let queryText = `INSERT INTO "user_trip" 
        ("trip_id", "user_id", "user_hasAccepted" )
        VALUES ($1,$2,$3);`
        pool.query(queryText, [trip_id, user_id, hasAccepted])
            .then((result) => { res.sendStatus(200) })
            .catch((error) => {
                console.log('Error joining user to trip', error);
                res.sendStatus(500)
            });
    }
});

// add trip to user's list
router.put('/join', (req, res) => {
    const user_id = req.user.id;
    const trip_id = req.body.id;
    let queryText = `UPDATE "user_trip" 
    SET "user_hasAccepted" = 'true'
    WHERE "user_id" = $1 AND "trip_id" = $2;`
    pool.query(queryText, [user_id, trip_id])
        .then((result) => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error joining user to trip', error);
            res.sendStatus(500)
        });
});

// remove trip from user's list
router.put('/leave', (req, res) => {
    const user_id = req.user.id;
    const trip_id = req.body.id;
    console.log(req.body);
    let queryText = `UPDATE "user_trip" 
    SET "user_hasAccepted" = 'false'
    WHERE "user_id" = $1 AND "trip_id" = $2;`
    pool.query(queryText, [user_id, trip_id])
        .then((result) => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error joining user to trip', error);
            res.sendStatus(500)
        });
});

// post new trip
router.post('/new-trip', (req, res) => {
    console.log('POST /api/trip/new-trip')
    const newTrip = req.body;
    const queryText = `INSERT INTO "trip" ("name", "location", "meetup_time", "meetup_spot",
     "meetup_coordinates", "exit_time", "exit_spot", "exit_coordinates",
     "mapURL", "creatorID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    pool.query(queryText,
        [newTrip.name,
        newTrip.location,
        newTrip.meetup_time,
        newTrip.meetup_spot,
        newTrip.meetup_coordinates,
        newTrip.exit_time,
        newTrip.exit_spot,
        newTrip.exit_coordinates,
        newTrip.mapURL,
        req.user.id])
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log('Error with POST /api/trip/new-trip', error);
            res.sendStatus(500);
        });
})

// get user's current trip id
router.get('/user-current-trip-id', (req, res) => {
    const user_id = req.user.id;
    let queryText = `SELECT "userCurrentTripID"
    FROM "user" 
    WHERE "id" = $1;`
    pool.query(queryText, [user_id])
        .then((result) => {
            console.log(result.rows[0].userCurrentTripID);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('Error fetching user current trip', error);
            res.sendStatus(500)
        });
});

// get user's current trip's data
router.get('/user-current-trip-data', (req, res) => {
    console.log(`GET request for user-current-trip-data with query ${req.query.trip_id}`)
    console.log(req.query)
    const trip_id = req.query.trip_id;
    let queryText = `SELECT *
    FROM "trip" 
    WHERE "id" = $1;`
    pool.query(queryText, [trip_id])
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('Error fetching user current trip', error);
            res.sendStatus(500)
        });
});

// set user's current trip id
router.put('/user-current-trip', (req, res) => {
    const user_id = req.user.id;
    const trip_id = req.body.trip_id.id;
    console.log(req.body);
    let queryText = `UPDATE "user" 
    SET "userCurrentTripID" = $1
    WHERE "id" = $2;`
    pool.query(queryText, [trip_id, user_id])
        .then((result) => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error posting user current trip', error);
            res.sendStatus(500)
        });
});

// GET user's new trip id
router.get(`/users-new-trip-id`, (req, res) => {
    const user_id = req.user.id;
    let queryText = `SELECT max("id")
    FROM "trip"
    WHERE "creatorID"= $1;`;
    pool.query(queryText, [user_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching user\'s new trip', error);
            res.sendStatus(500)
        });
});

// GET all trips for user
router.get('/user-trips', (req, res) => {
    const user_id = req.user.id;
    let queryText = `SELECT *
    FROM "trip"
    JOIN "user_trip" ON "trip"."id" = "user_trip"."trip_id"
    WHERE "user_trip"."user_id" = $1;`
    pool.query(queryText, [user_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching user trips', error);
            res.sendStatus(500)
        });
});



module.exports = router;