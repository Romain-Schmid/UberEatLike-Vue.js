export {};
const { Menu } = require('../models/modelMongo');


exports.getAll = (req : any, res : any) => {
  Menu.find({ id_restaurant : req.params.id_rest }).populate('article')
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu."
      });
    });
};


exports.findOne = (req : any, res : any) => {
  Menu.findById(req.params.id_menu).populate('article')
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Menu."
      });
    });
};

exports.update = async (req : any, res : any) => {
  const data = req.body;
  data.article = data.article.split(",")
  Menu.findOneAndUpdate({_id : req.params.id_menu, id_restaurant : req.params.id_rest},
    data)
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

exports.delete = (req : any, res : any) => {
	Menu.deleteOne({_id : req.params.id_menu, id_restaurant : req.params.id_rest})
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

