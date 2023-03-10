const db = require("../models");
const Book = db.book;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    console.log("import 2",req.body.shelf);

  
    const book = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      shelfId:req.body.shelf
    };
  
    Book.create(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log("here catch error while creating book")
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      });
  };
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    console.log("condition from findall=> " ,condition)
  
    Book.findAll({ where: condition })
      .then(data => {
        console.log("data from db=> " ,data)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };

exports.findOne = (req, res) => {
    exports.findOne = (req, res) => {
        const id = req.params.id;
      
        Book.findByPk(id)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Book with id=${id}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Book with id=" + id
            });
          });
      };
};

exports.update = (req, res) => {
    const id = req.params.id;
  
    Book.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Book.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Book.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Books were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all books."
        });
      });
  };

exports.findAllPublished = (req, res) => {
    Book.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };