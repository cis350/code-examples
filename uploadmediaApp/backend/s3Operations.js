const AWS = require('aws-sdk');

// dotenv helps manage environment variables
require('dotenv').config();

const fs = require('fs');


// The name of the bucket that you have created
const BUCKET_NAME = 'cis557sp21';

// we load credentials from the .env file
const s3 = new AWS.S3({
    accessKeyId: process.env.ID, 
    secretAccessKey: process.env.SECRET
});


// upload a file
const uploadFile = async (fileContent, fileName) => {

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name we want to upload
        Body: fileContent
    };

    // Uploading files to the bucket
    /** 
    s3.upload(params, function(err, data) {
        if (err) {
            console.log('Error', err.message);
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        return data.Location;
    });
    */
   const data = await  s3.upload(params).promise();
   console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location;
};

// uploadFile('dog.jpg');

// retrieve a file
const retrieveFile = (fileName) => {
    // Setting up S3 read parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name we want to retrieve
    };

    // download file from the bucket
    s3.getObject(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File downloaded successfully. ${data.Body}`);
        // do something with the file
        const fStream = fs.createWriteStream(`${fileName}`);
        fStream.write(data.Body);
        fStream.end();
        // return data
        return data.Body;
    });
};



// delete a file
const deleteFile = (fileName) => {
    // Setting up S3 delete parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name we want to delete
    };

    // download file from the bucket
    s3.deleteObject(params, function(err, data) {
        if (err) {
            // throw err;
            return false;
        }
        console.log(`File deleted successfully. ${data}`);
        return true;
    });
};



module.exports ={uploadFile, retrieveFile, deleteFile}

