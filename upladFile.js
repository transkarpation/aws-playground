require('dotenv').config();
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');


(async function() {
    aws.config.setPromisesDependency();
    aws.config.update({
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY
    });

    let s3 = new aws.S3();
    let filePath = "./data/fle.txt";

    let params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Body : fs.createReadStream(filePath),
        Key : path.basename(filePath)
    };

    let uploadResult = await s3.upload(params).promise();

    console.log(uploadResult);

    let list = await s3.listObjectsV2({
        Bucket: process.env.AWS_S3_BUCKET
    }).promise();

    console.log(list);
})();