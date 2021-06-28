export {};
const { Article, Menu } = require('../models/modelMongo');



exports.getAll = (req, res) => {
  Article.find({ id_restaurant : req.params.id_rest })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Article."
      });
    });
};


exports.findOne = (req, res) => {
  Article.findById(req.params.id_article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Article."
      });
    });
};

exports.update = async (req, res) => {
  Article.findOneAndUpdate({_id : req.params.id_article, id_restaurant : req.params.id_rest},
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

exports.delete = async (req, res) => {
  const menuTest = await Menu.deleteMany({ article : req.params.id_article});

	Article.deleteOne({_id : req.params.id_article, id_restaurant : req.params.id_rest})
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

