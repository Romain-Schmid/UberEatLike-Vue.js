module.exports = {
    HOST: "fradetaxel.fr",
    USER: "fradet",
    PASSWORD: "cesiteam",
    DB: "projet_logiciel",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };