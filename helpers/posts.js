const saveFile = async (file) => {
  const fileName = file.originalname;
  const modifiedFileName = fileName.replace(/\s/g, "_"); // Replace spaces with underscores
  const filePath = path.join(__dirname, "..", "uploads", modifiedFileName);
  console.log("asdasd", filePath);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file.buffer, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(filePath);
      }
    });
  });
};

module.exports = saveFile;
