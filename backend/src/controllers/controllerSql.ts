import { Hash } from "crypto";

export {};
const bcrypt = require('bcrypt')
const db_sql = require("../models");
const User = db_sql.model;

// var User = sequelize.define('user', {
//     username: Sequelize.STRING,
//     password: Sequelize.STRING
//   });
  
//   sequelize.sync().then(function() {
//     return User.create({
//       username: 'root',
//       password: 'root'
//     });
//   }).then(function(root) {
//     console.log(root.get({
//       plain: true
//     }));
//   });

// Create and Save a new User
exports.create = (req, res) => {
      // Create a User
      const user = {
        email : req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };
    
      // Save User in the database
      User.create(user)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
        });
};

exports.createAccount =async (req, res) => {
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash( req.body.password, 10)
    const user = {
      email : req.body.email,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    };
    User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
  } catch {
    res.status(500).send()
  }
};

exports.loginAccount = async (req, res) => {
  const email = req.body.email  
  const user = await User.findOne({ where : {email : email }})
  if(user == null){
      return res.status(400).send('Cannot find user')   
  }
  try {
      if(await bcrypt.compare(req.body.password, user.password)){
        res.send('Success')
      }else{
        res.send('Not Allowed')
      }
  }catch{
    res.status(500).send()
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving users with id=" + id
      });
    });
};

// Find me with email
exports.findMe = (req, res) => {
  const email = req.user.email;
  User.findOne({ where : {email : email }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "DOn't find your profil"
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const email = req.body.email;

  User.update(req.body, {
    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with email=${email}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with email=" + email
      });
    }); 
};

// Update a User by the id in the request
exports.updateParam = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    }); 
};

//Add refreshToken to account
exports.refreshToekn = (refTok) => {



};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Users."
          });
        });
};

// Find all published Users
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.module = {User: User, db_sql : db_sql};