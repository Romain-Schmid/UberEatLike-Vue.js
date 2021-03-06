
module.exports = (sequelize : any, Sequelize : any) => {
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
        allowNull: false
      },
      owner : {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      description : {
        type: Sequelize.STRING,
      },
      picture : {
        type: Sequelize.STRING,
      }
    });

    const Article = sequelize.define("article", {
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      owner : {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
        // allowNull: false
      },
      description : {
        type: Sequelize.STRING,
      },
      picture : {
        type: Sequelize.STRING,
      }
    });

    return {User: User, Restaurant : Restaurant};
  };