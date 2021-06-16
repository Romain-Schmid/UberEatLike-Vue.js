export {};
const db_sql = require("../models");
const Restaurant = db_sql.model.Restaurant;

// Create and Save a new Restaurant
exports.create = (req, res) => {
      // Create a Restaurant
      const rest = {
        titre : req.body.titre,
        note: req.body.note,
        description: req.body.description,
        owner : req.email
      };
    
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


