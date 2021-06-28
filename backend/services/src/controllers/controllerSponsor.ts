export {};
const { Sponsor } = require('../models/modelMongo');
const db_sql = require("../models");
const User = db_sql.model.User;

exports.create = async (req : any, res : any) => {
  const email_user = req.email
  const email_friend = req.body.email_friend
  const spons = new Sponsor({
    email_user : email_user,
    email_friend : email_friend
  })  

  //Check same role for sponsor
  const user = await User.findOne({ where : {email : email_friend }, attributes: ['role']})
  if( user.role != req.role ){
    return res.status(400).send("This friend do not have the same role as you"); 
  }

  //Check if friend already have sponsor
  if((await Sponsor.countDocuments({email_friend : email_friend})) != 0 ){
    return res.status(400).send("This friend already has a sponsor"); 
  }

  

  spons.save()
  .then((data : any) => {
    res.send(data);
  })
  .catch((err: any) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Sponsor."
    });
  });
};


exports.getAll = (req : any, res : any) => {
  Sponsor.find({ email_user: req.email})
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sponsor."
      });
    });
};

exports.findOne = (req : any, res : any) => {
  Sponsor.findById(req.params.id_sponsor)
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sponsor."
      });
    });
};


exports.delete = async (req : any, res : any) => {
	Sponsor.deleteOne({_id : req.params.id_sponsor})
  .then((response: any) => {
    console.log(response)
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

