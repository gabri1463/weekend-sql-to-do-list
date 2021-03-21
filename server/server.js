// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser');
const router = require( './modules/routes/tasks_routes');
const editRouter = require( './modules/routes/editTime_routes');

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( '/tasks', router );
app.use( '/editTime', editRouter );

// globals
const port = 5000;

// server
app.listen( port, () => {
    console.log( 'server is up on port:', port);
})