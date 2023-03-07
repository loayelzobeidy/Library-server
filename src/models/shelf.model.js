module.exports = (sequelize, Sequelize) => {
    const Shelf = sequelize.define("shelfs", {
      location: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.TINYINT
      },

    });
  
    return Shelf;
  };
  