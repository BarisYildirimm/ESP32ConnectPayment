import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

export const uploadSingle = upload("bladeco-charge-user-image").single("userImage");
export const deleteImageToAws = (imagePathName) => {
  console.log("ResimYolu : ", imagePathName);
  s3.deleteObjects({
    Bucket: "bladeco-charge-user-image",
    Delete: {
      Objects: [{ Key: imagePathName }],
      Quiet: false,
    }
  }, (err, data) => {
    if (err) console.log("AWS ::::", err);
  })
}
