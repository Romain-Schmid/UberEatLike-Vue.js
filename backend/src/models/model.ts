module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.STRING,
      },
      expiredToken : {
        type : Sequelize.DATE
      }
    });
  
    return User;
  };