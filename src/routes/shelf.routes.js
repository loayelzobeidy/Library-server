const { authJwt } = require("../middleware");

module.exports = app => {
    const shelfs = require("../controllers/shelf.controller.js");
  
    var router = require("express").Router();

    router.post("/",  [authJwt.verifyToken],shelfs.create);
  
    router.get("/",  [authJwt.verifyToken],shelfs.findAll);
  
  
    router.get("/:id", [authJwt.verifyToken], shelfs.findOne);
  
    router.put("/:id", [authJwt.verifyToken], shelfs.update);
  
    router.delete("/:id",  [authJwt.verifyToken],shelfs.delete);
  
    router.delete("/", [authJwt.verifyToken], shelfs.deleteAll);
  
    app.use('/api/shelfs',  [authJwt.verifyToken],router);
  };