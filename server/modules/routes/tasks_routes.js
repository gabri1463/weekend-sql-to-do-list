const express = require( 'express' );
const router = express.Router();
const pool = require( '../pool');
// const timeCompleted = require( '../moment')
const moment = require( 'moment' );

// GET
router.get( '/', ( req, res ) => {
    console.log( 'in tasks_routes GET' );
    let queryText = `SELECT * FROM "tasks" ORDER BY "id" ASC`
    pool.query( queryText ).then( ( results ) => {
        res.send( results.rows );
    }).catch( ( err ) =>{
        console.log( err );
        res.sendStatus( 500 );
    })
});

// POST
router.post( '/', ( req, res ) => {
    console.log( 'in tasks_routes POST' );
    let queryText = `INSERT INTO "tasks" ("task", "completed", "timecompleted") VALUES ($1, $2, $3)`;
    pool.query( queryText, [ req.body.task, req.body.completed, req.body.timecompleted ] ).then( ( results ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    })
})


// PUT
router.put( '/:id', ( req, res ) => {
    console.log( 'in tasks_routes PUT', req.params );
    let queryText = `UPDATE "tasks" SET "completed" = true, "timecompleted" = $2 WHERE "id" = $1`;
    pool.query( queryText, [ req.params.id, moment().format( 'hh:mm a' ) ] ).then( ( results ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    })
})

// DELETE
router.delete( '/:id', ( req, res ) => {
    console.log( 'in tasks_routes DELETE', req.params);
    let queryText = `DELETE FROM "tasks" WHERE "id" = $1`
    pool.query( queryText, [ req.params.id ] ).then( ( results) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 ); 
    })
})



module.exports = router;