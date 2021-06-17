export {};
const db_sql = require("../models");
const Restaurant = db_sql.model.Restaurant;

// Create and Save a new Restaurant
exports.create = (req, res) => {
  
  if(req.role != "Restorer"){
    res.status(400).send("Action non authorisé avec votre rôle")
  }
  // Create a Restaurant
  const rest = {
    titre : req.body.titre,
    note: req.body.note,
    description: req.body.description,
    owner : req.email
  };

  console.log(rest);

  // Save User in the database
  Restaurant.create(rest)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restaurant."
      });
    });
};

exports.getAll = (req, res) => {
  Restaurant.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

exports.getMine = (req, res) => {
  const owner = req.email;
  Restaurant.findAll({where : {owner: owner}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Restaurant.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error" 
      });
    });
};

exports.update = async (req, res) => {
  const owner = req.email;
  const {titre, note, description} = req.body

  const rest = {
    titre :titre,
    note: note,
    description: description,
    owner : owner
  };

  Restaurant.update(rest, {
    where: { owner: owner, titre : titre }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "success"
        });
      } else {
        res.send({
          message: `Cannot update`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error"
      });
    }); 
};
