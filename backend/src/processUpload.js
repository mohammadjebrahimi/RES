const shortid = require("shortid");
const { writeFile } = require("fs");

const storeUpload = async (blobPart, mimetype) => {

  const extension = mimetype.split("/")[1];
  const id = `${shortid.generate()}.${extension}`;
  const path = `images/${id}`;

  return new Promise((resolve, reject) => {

   return writeFile(path, blobPart, function (err) {
      if (err) {
        reject
        return console.log(err);

      }
      return resolve({ id, path })
    });

  }
  );
};
const processUpload = async (upload) => {
  const { type } = await upload;
  const buffer = Buffer.from(await upload.arrayBuffer());

  const { id } = await storeUpload(buffer, type);
  return id;
}
module.exports = { processUpload };