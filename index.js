const AWS = require("aws-sdk");
const mbxClient = require("@mapbox/mapbox-sdk");
const mbxUploads = require("@mapbox/mapbox-sdk/services/uploads");
const config = require("./uploadConfig.js");
const fs = require("fs");

const baseClient = mbxClient({ accessToken: config.ACCESS_TOKEN });
const uploadsClient = mbxUploads(baseClient);

let credentials = {};

const getCredentials = () => {
  return uploadsClient
    .createUploadCredentials()
    .send()
    .then((response) => {
      credentials = response.body;
    });
};

const putFileOnS3 = () => {
  const s3 = new AWS.S3({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    region: "us-east-1",
  });

  const filePath = `${config.FILE_FOLDER}/${config.FILE_NAME}.${config.FILE_EXT}`;
  return s3
    .putObject({
      Bucket: credentials.bucket,
      Key: credentials.key,
      Body: fs.createReadStream(filePath),
    })
    .on("httpUploadProgress", (e) => {
      const pr = Math.floor((e.loaded / e.total) * 100);
      console.log(`${e.loaded} of ${e.total} (${pr}%)`);
    })
    .promise();
};

getCredentials()
  .then(putFileOnS3)
  .then(() => {
    console.log("FILE ON AWS, START UPLOADING");

    uploadsClient
      .createUpload({
        tileset: `${config.USERNAME}.${config.FILE_NAME}`,
        url: credentials.url,
        name: config.FILE_NAME,
      })
      .send()
      .then((response) => {
        const upload = response.body;
        console.log("FILE UPLOADED", upload);
      });
  });
