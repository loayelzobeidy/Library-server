module.exports = app => {
    const shelfs = require("../controllers/shelf.controller.js");
  
    var router = require("express").Router();

    router.post("/", shelfs.create);
  
    router.get("/", shelfs.findAll);
  
  
    router.get("/:id", shelfs.findOne);
  
    router.put("/:id", shelfs.update);
  
    router.delete("/:id", shelfs.delete);
  
    router.delete("/", shelfs.deleteAll);
  
    app.use('/api/shelfs', router);
  };