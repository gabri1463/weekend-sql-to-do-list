const express = require( 'express' );
const router = express.Router();
const pool = require( './pool');

router.get( '/', ( req, res ) => {
    console.log( 'in tasks_routes GET' );
    let queryText = `SELECT * FROM "tasks"`
    pool.query( queryText ).then( ( results ) => {
        res.send( results.rows );
    }).catch( ( err ) =>{
        console.log( err );
        res.sendStatus( 500 );
    })
});

router.post( '/', ( req, res ) => {
    console.log( 'in tasks_routes PUT' );
    let queryText = `INSERT INTO "tasks" ("task", "completed") VALUES ($1, $2)`;
    pool.query( queryText, [ req.body.task, req.body.completed ] ).then( ( results ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    })
})

module.exports = router;