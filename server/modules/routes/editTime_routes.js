const express = require( 'express' );
const editRouter = express.Router();
const pool = require( '../pool');

// PUT 
editRouter.put( '/:id', ( req, res ) => {
    console.log( 'in tasks_routes /editTime PUT', req.query, req.params);
    let queryText = `UPDATE "tasks" SET "timecompleted" = $1 WHERE "id" = $2`
    pool.query( queryText, [ req.query.newTime, req.params.id ] ).then( ( results ) => {
        res.sendStatus( 200 );
    }).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    })
})

module.exports = editRouter;
