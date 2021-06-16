// const User = sequelize.define("user", {
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false
//   },
//   username: {
//     type: Sequelize.STRING,
//     // allowNull: false
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   role: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   refreshToken: {
//     type: Sequelize.STRING,
//   },
//   expiredToken : {
//     type : Sequelize.DATE
//   }
// });

// const Restaurant = sequelize.define("restaurant", {
//   titre: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false
//   },
//   note: {
//     type: Sequelize.STRING,
//     // allowNull: false
//   },
//   description : {
//     type: Sequelize.STRING,
//   }
// });


// exports.module = {User: User, Restaurant : Restaurant};


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
    const Restaurant = sequelize.define("restaurant", {
      titre: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      description : {
        type: Sequelize.STRING,
      }
    });

    return {User: User, Restaurant : Restaurant};
  };