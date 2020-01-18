require('dotenv').config();
const aws = require('aws-sdk');

(async function() {
    aws.config.setPromisesDependency();
    aws.config.update({
        accessKeyId: process.env.AWS_SES_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY,
        region: process.env.AWS_SES_EMAIL_REGION
    });

    let ses = new aws.SES();


    const params = {
        Destination: {
          /* required */
          ToAddresses: [
            process.env.DESTINATION_EMAIL
            /* more items */
          ]
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: 'UTF-8',
              Data: `<html><body> <p>We heard that you lost your password. Sorry about that!</p>
                        <p>But don’t worry! You can use the following link to reset your password: </p>
                        <p>If you don’t use this link within 1 hour, it will expire.</p>
                        <p>Thanks,</p>
                        </body></html>`
            },
            Text: {
              Charset: 'UTF-8',
              Data: 'TEXT_FORMAT_BODY'
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Reset password Depot'
          }
        },
        Source: process.env.SOURCE_EMAIL /* required */
    };


    let result = await ses.sendEmail(params).promise();
    console.log(result);
})();