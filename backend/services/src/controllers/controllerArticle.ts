export {};
const { Article, Menu } = require('../models/modelMongo');



exports.getAll = (req : any, res : any) => {
  Article.find({ id_restaurant : req.params.id_rest })
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Article."
      });
    });
};


exports.findOne = (req : any, res : any) => {
  Article.findById(req.params.id_article)
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Article."
      });
    });
};

exports.update = async (req : any, res : any) => {
  Article.findOneAndUpdate({_id : req.params.id_article, id_restaurant : req.params.id_rest},
     req.body)
    .then((num: any) => {
        if (num == null) {
          res.status(400).send({
            message: "Cannot update"
          });
        } else {
          res.status(200).send({
            message: `Success`
          });
        }})
    .catch((error : any) => res.status(400).json({ error }));
};

exports.delete = async (req : any, res : any) => {
  const menuTest = await Menu.deleteMany({ article : req.params.id_article});

	Article.deleteOne({_id : req.params.id_article, id_restaurant : req.params.id_rest})
  .then((response: any) => {
    if (response.deletedCount == 1) {
      res.status(200).send({
        message: `Success`
      });
    } else {
      res.status(400).send({
        message: "Cannot delete"
      });
    }})
.catch((error : any) => res.status(400).json("Cannot delete"));
}

