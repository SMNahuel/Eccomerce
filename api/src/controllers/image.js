const path = require("path");

const image = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));//get a html
};

module.exports = {
  getImage: image
};