module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      shelfId:{
        type: Sequelize.INTEGER,
        references: {
            model: 'shelfs',
            key: 'id'
        }
    }
    });
  
    return Book;
  };
  