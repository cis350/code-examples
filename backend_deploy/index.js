/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./controller/server');

const port = 8080;
// start the web server
webapp.listen(port, () =>{
    console.log('Server running on port', port);
})