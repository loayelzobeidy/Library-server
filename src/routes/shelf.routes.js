const { authJwt } = require("../middleware");

module.exports = app => {
    const shelfs = require("../controllers/shelf.controller.js");
  
    var router = require("express").Router();

    router.post("/",  [authJwt.verifyToken, authJwt.isAdmin],shelfs.create);
  
    router.get("/",  [authJwt.verifyToken],shelfs.findAll);
  
  
    router.get("/:id", [authJwt.verifyToken], shelfs.findOne);
  
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], shelfs.update);
  
    router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin],shelfs.delete);
  
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], shelfs.deleteAll);
  
    app.use('/api/shelfs',  [authJwt.verifyToken],router);
  };