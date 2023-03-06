const { authJwt } = require("../middleware");

module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Book
    router.post("/", [authJwt.verifyToken],books.create);
  
    // Retrieve all Books
    router.get("/",  [authJwt.verifyToken],books.findAll);
  
    // Retrieve all published Books
    router.get("/published", [authJwt.verifyToken], books.findAllPublished);
  
    // Retrieve a single Book with id
    router.get("/:id",  [authJwt.verifyToken],books.findOne);
  
    // Update a Book with id
    router.put("/:id", [authJwt.verifyToken], books.update);
  
    // Delete a Book with id
    router.delete("/:id", [authJwt.verifyToken], books.delete);
  
    // Delete all Books
    router.delete("/", [authJwt.verifyToken], books.deleteAll);
  
    app.use('/api/books', router);
  };