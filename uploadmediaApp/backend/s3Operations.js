const {
    Upload
} = require("@aws-sdk/lib-storage");

const {
    S3
} = require("@aws-sdk/client-s3");

// dotenv helps manage environment variables
require('dotenv').config();



const fs = require('fs');


// The name of the bucket that you have created
const BUCKET_NAME = 'cis557sp21';

// we load credentials from the .env file
const s3 = new S3({
    credentials: {
        accessKeyId: process.env.ID,
        secretAccessKey: process.env.SECRET
    },
    region: 'us-east-1',
});


// upload a file
const uploadFile = async (fileContent, fileName) => {
    console.log('fileName', fileName);
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name we want to upload
        Body: fileContent // the buffer
    };

    // Uploading files to the bucket
  
   const data = await  new Upload({
       client: s3,
       params
   }).done();
   console.log(`File uploaded successfully. ${data.Location}`);
   // return the URL of the object on S3
    return data.Location;
};


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

