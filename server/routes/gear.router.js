const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// GET gear list by description ASC
router.get('/asc', rejectUnauthenticated, (req, res) => {
    // console.log('this is the query', req.query);
    const trip_id = req.query.trip_id;
    // console.log('fetching gear for trip: ',trip_id)
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."user_id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = $1
    ORDER BY "user_trip_gear"."description" ASC;`
    pool.query(queryText, [trip_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});


// GET gear list by description DESC
router.get('/desc', rejectUnauthenticated, (req, res) => {
    // console.log('this is the query', req.query);
    const trip_id = req.query.trip_id;
    // console.log('fetching gear for trip: ',trip_id)
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."user_id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = $1
    ORDER BY "user_trip_gear"."description" DESC;`
    pool.query(queryText, [trip_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});

// GET gear list by provider asc
router.get('/provider-asc', rejectUnauthenticated, (req, res) => {
    // console.log('this is the query', req.query);
    const trip_id = req.query.trip_id;
    // console.log('fetching gear for trip: ',trip_id)
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."user_id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = $1
    ORDER BY "user"."username" ASC;`
    pool.query(queryText, [trip_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});


// GET gear list by provider desc
router.get('/provider-desc', rejectUnauthenticated, (req, res) => {
    // console.log('this is the query', req.query);
    const trip_id = req.query.trip_id;
    // console.log('fetching gear for trip: ',trip_id)
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."user_id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = $1
    ORDER BY "user"."username" DESC;`
    pool.query(queryText, [trip_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});

// GET gear list by quantity asc
router.get('/quantity-asc', rejectUnauthenticated, (req, res) => {
    const trip_id = req.query.trip_id;
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."user_id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = $1
    ORDER BY "user_trip_gear"."quantity" ASC;`
    pool.query(queryText, [trip_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});

// GET gear list by quantity asc
router.get('/quantity-desc', rejectUnauthenticated, (req, res) => {
    const trip_id = req.query.trip_id;
    let queryText = `SELECT "description","quantity", "user"."username", "user_trip_gear"."id"
    FROM "user_trip_gear"
    LEFT JOIN "user" 
    ON "user_trip_gear"."user_id" = "user"."id"
    WHERE "user_trip_gear"."trip_id" = $1
    ORDER BY "user_trip_gear"."quantity" DESC;`
    pool.query(queryText, [trip_id])
        .then((result) => { res.send(result.rows) })
        .catch((error) => {
            console.log('Error fetching trip gear', error);
            res.sendStatus(500)
        });
});


router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(`DELETE /api/gear/ with req.params`, req.params);
    const gear_id = req.params.id;
    // console.log(tripID);
    const queryText = `DELETE FROM "user_trip_gear"
    WHERE "id" = $1`;
    pool.query(queryText, [gear_id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error with POST /api/trip/new-trip', error);
            res.sendStatus(500);
        });
})

router.post('/new-item', rejectUnauthenticated, (req, res) => {
    // console.log('POST /api/gear/new-gear')
    const newItem = req.body.newItem;
    const tripID = req.body.id;
    // console.log(tripID);
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

router.put('/new-item-provider', rejectUnauthenticated, (req, res) => {
    const user_id = req.user.id;
    const item_id = req.body.item_id;
    console.log(item_id);
    let queryText = `UPDATE "user_trip_gear" 
    SET "user_id" = $1
    WHERE "id" = $2;`
    pool.query(queryText, [user_id, item_id])
        .then((result) => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error joining user to trip', error);
            res.sendStatus(500)
        });
});

router.put('/null-item-provider', rejectUnauthenticated, (req, res) => {
    const item_id = req.body.item_id;
    console.log(item_id);
    let queryText = `UPDATE "user_trip_gear" 
    SET "user_id" = NULL
    WHERE "id" = $1;`
    pool.query(queryText, [item_id])
        .then((result) => { res.sendStatus(200) })
        .catch((error) => {
            console.log('Error joining user to trip', error);
            res.sendStatus(500)
        });
});

module.exports = router;