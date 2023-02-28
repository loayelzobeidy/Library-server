const db = require("../models");
const Shelf = db.shelf;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if (!req.body.location) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

  
    const shelf = {
      location: req.body.location,
      length: req.body.length ? req.body.length : false
    };
  
    Shelf.create(shelf)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      });
  };
exports.findAll = (req, res) => {
    const location = req.query.location;
    var condition = location ? { location: { [Op.like]: `%${location}%` } } : null;
  
    Shelf.findAll({ where: condition })
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

exports.findOne = (req, res) => {
    exports.findOne = (req, res) => {
        const location = req.params.location;
      
        Shelf.findByPk(location)
          .then(data => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Book with location=${location}.`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Book with location=" + location
            });
          });
      };
};

exports.update = (req, res) => {
    const location = req.params.location;
  
    Shelf.update(req.body, {
      where: { location: location }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Book with location=${location}. Maybe Book was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with location=" + location
        });
      });
  };

exports.delete = (req, res) => {
    const location = req.params.location;
  
    Shelf.destroy({
      where: { location: location }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Book was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Book with location=${location}. Maybe Book was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with location=" + location
        });
      });
  };

exports.deleteAll = (req, res) => {
    Shelf.destroy({
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

exports.findAllLengths = (req, res) => {
    Shelf.findAll({ where: { length: true } })
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