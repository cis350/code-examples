// import fs
const fs = require('fs');

// import express
const express = require('express');

// import formidable
const formidable = require('formidable');

// enable cross-origin resource sharing (cors)
const cors = require('cors');

// Create express app
const webapp = express();

// import S3 operations
const s3 = require('./s3Operations');

webapp.use(cors());

// Server port
const port = 8080;

webapp.use(express.urlencoded({
  extended: true,
}));


// Start server and connect to the DB
webapp.listen(port, async () => {
  console.log(`Server running on port:${port}`);
});

// Root endpoint
webapp.get('/', (_req, res) => {
  res.json({ message: 'Welcome to our images/files upalod backend' });
});


// upload endpoint with formidable
webapp.post('/upload/', async (req, res) => {
  console.log('upload a file');
  const form = formidable({}); //{ multiples: true });
  form.parse(req, (err, fields, files) => {

    if(err){
        console.log('error', err.message);
       res.status(404).json({ error: err.message });
    }
    //create a buffer to cache uploaded file
    let cacheBuffer = Buffer.alloc(0);

    // create a stream from the virtual path of the uploaded file
    const fStream = fs.createReadStream(files.File_0.path);


    fStream.on('data', (chunk) => {
        // fill the buffer with data from the uploaded file
        cacheBuffer = Buffer.concat([cacheBuffer, chunk]);
      });

      fStream.on('end', async () => {
        // send buffer to AWS - The url of the object is returned
        const s3URL =  await s3.uploadFile(cacheBuffer, files.File_0.name);
        console.log('end', cacheBuffer.length);

        // You can store the URL in mongoDB along with the rest of the data
        // send a response to the client
        res.status(201).json({ message: `files uploaded at ${s3URL}` });   
      });   
  });
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});
