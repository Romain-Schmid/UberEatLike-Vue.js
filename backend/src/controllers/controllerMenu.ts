export {};
const { Menu } = require('../models/modelMongo');


exports.getAll = (req, res) => {
  Menu.find({ id_restaurant : req.params.id_rest }).populate('article')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu."
      });
    });
};


exports.findOne = (req, res) => {
  Menu.findById(req.params.id_menu).populate('article')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu."
      });
    });
};

exports.update = async (req, res) => {
  Menu.findOneAndUpdate({_id : req.params.id_menu, id_restaurant : req.params.id_rest},
     req.body)
    .then(num => {
        if (num == null) {
          res.status(400).send({
            message: "Cannot update"
          });
        } else {
          res.status(200).send({
            message: `Success`
          });
        }})
    .catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res) => {
	Menu.deleteOne({_id : req.params.id_menu, id_restaurant : req.params.id_rest})
  .then(response => {
    if (response.deletedCount == 1) {
      res.status(200).send({
        message: `Success`
      });
    } else {
      res.status(400).send({
        message: "Cannot delete"
      });
    }})
.catch(error => res.status(400).json("Cannot delete"));
}

