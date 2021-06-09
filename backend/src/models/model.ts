module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("usered", {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return User;
  };