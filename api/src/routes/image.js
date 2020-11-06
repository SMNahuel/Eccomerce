const server = require("express").Router();
const imageController = require("../controllers/image");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

// let server = (app) => {
  
    server.get("/", imageController.getImage);//comentada en controlador

    server.post("/upload", upload.single("file"), uploadController.uploadFiles);

    //return app.use("/", server);

//};

module.exports = server;