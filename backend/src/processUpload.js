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
  const { blobParts, type } = await upload;
  const { id } = await storeUpload(blobParts[0], type);
  return id;
}
module.exports = { processUpload };