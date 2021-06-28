export {};
import {findOrder} from "../models/object";

const { Order, Menu, Article, Restaurant } = require('../models/modelMongo');


exports.create = (req : any, res : any) => {
  const email_customer = req.email
  const content = req.body.content.split(',')
  const {id_restaurant, prix} = req.body;
  const ord = new Order({
    content : content,
    id_restaurant : id_restaurant,
    email_customer : email_customer,
    prix : prix,
  })

  ord.save()
  .then((data : any) => {
    res.send(data);
  })
  .catch((err: any) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the order."
    });
  });
};


exports.getAll = (req : any, res : any) => {
  var findOrder : findOrder = {}

  //Customer will get his own order
  if( req.role == "Customer" ){
    findOrder['email_customer'] = req.email 
  }
  //Restorer will get order for his restaurant id
  else if( req.role == "Restorer" ){
    findOrder['id_restaurant'] = req.params.id_rest
  }
  //DeliveryMan will see order in ready status
  else if( req.role == "DeliveryMan" ){
    findOrder['status'] = "ready"
  }
  Order.find(findOrder).populate('id_restaurant', "-menu -article -type -note -description -picture -__v ")
    .then((data : any) => {
      console.log(data)
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order."
      });
    });
};

exports.findOne = (req : any, res : any) => {
  Order.findById(req.params.id_order).populate('id_restaurant', "-menu -article -type -note -description -picture -__v ")
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order."
      });
    });
};

exports.getMyDelivery = (req : any, res : any) => {

  Order.find({email_delivery : req.email })
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order."
      });
    });
};

exports.update = async (req : any, res : any) => {
  Order.findOneAndUpdate({_id : req.params.id_order},
     req.body, {new : true})
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

exports.paid = async (req : any, res : any) => {
  Order.findOneAndUpdate({_id : req.params.id_order, status : "unpaid"},
    {status : "paid"}, {new : true})
    .then((num: any) => {
        if (num == null) {
          res.status(400).send("This order is already paid");
        } else {
          res.send(num);
        }})
    .catch((error : any) => res.status(400).json(error.message));
};

exports.ready = (req : any, res : any) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "paid"}, 
    {status : "ready"},  {new : true})
    .then((num: any) => {
      if (num == null) {
        res.status(400).send("You can't finish the food until customer paid");
      } else {
        res.send(num);
      }})
    .catch((error : any) => res.status(400).json({ error }));
};

exports.validate = (req : any, res : any) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "ready", email_delivery : null}, 
    {email_delivery : req.email},  {new : true})
    .then((num: any) => {
      if (num == null) {
        res.status(400).send("You can't validate this order, maybe someone has already took it");
      } else {
        res.send(num);
      }})
      .catch((error : any) => res.status(400).json({ error }));
};

exports.startDelivery = (req : any, res : any) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "ready"}, 
    {status : "pending"},  {new : true})
    .then((num: any) => {
      if (num == null) {
        res.status(400).send("You can't start the delivery until the food isn't ready");
      } else {
        res.send(num);
      }})
      .catch((error : any) => res.status(400).json({ error }));
};

exports.finishDelivery = (req : any, res : any) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "pending"}, 
    {status : "finish"},  {new : true})
    .then((num: any) => {
      if (num == null) {
        res.status(400).send("You can't finish the delivery until the delivery didn't started");
      } else {
        res.send(num);
      }})
    .catch((error : any) => res.status(400).json({ error }));
};

exports.delete = async (req : any, res : any) => {
	Order.deleteOne({_id : req.params.id_order})
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
