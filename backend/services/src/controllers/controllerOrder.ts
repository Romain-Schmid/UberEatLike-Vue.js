export {};
const { Order, Menu, Article, Restaurant } = require('../models/modelMongo');


exports.create = (req, res) => {
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
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the order."
    });
  });
};


exports.getAll = (req, res) => {
  var find = {}

  //Customer will get his own order
  if( req.role == "Customer" ){
    find['email_customer'] = req.email 
  }
  //Restorer will get order for his restaurant id
  else if( req.role == "Restorer" ){
    find['id_restaurant'] = req.params.id_rest
  }
  //DeliveryMan will see order in ready status
  else if( req.role == "DeliveryMan" ){
    find['status'] = "ready"
  }
  Order.find(find).populate('id_restaurant', "-menu -article -type -note -description -picture -__v ")
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order."
      });
    });
};

exports.findOne = (req, res) => {
  Order.findById(req.params.id_order).populate('id_restaurant', "-menu -article -type -note -description -picture -__v ")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order."
      });
    });
};

exports.getMyDelivery = (req, res) => {

  Order.find({email_delivery : req.email })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order."
      });
    });
};

exports.update = async (req, res) => {
  Order.findOneAndUpdate({_id : req.params.id_order},
     req.body, {new : true})
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

exports.paid = async (req, res) => {
  Order.findOneAndUpdate({_id : req.params.id_order, status : "unpaid"},
    {status : "paid"}, {new : true})
    .then(num => {
        if (num == null) {
          res.status(400).send("This order is already paid");
        } else {
          res.send(num);
        }})
    .catch(error => res.status(400).json(error.message));
};

exports.ready = (req, res) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "paid"}, 
    {status : "ready"},  {new : true})
    .then(num => {
      if (num == null) {
        res.status(400).send("You can't finish the food until customer paid");
      } else {
        res.send(num);
      }})
    .catch(error => res.status(400).json({ error }));
};

exports.validate = (req, res) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "ready", email_delivery : null}, 
    {email_delivery : req.email},  {new : true})
    .then(num => {
      if (num == null) {
        res.status(400).send("You can't validate this order, maybe someone has already took it");
      } else {
        res.send(num);
      }})
      .catch(error => res.status(400).json({ error }));
};

exports.startDelivery = (req, res) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "ready"}, 
    {status : "pending"},  {new : true})
    .then(num => {
      if (num == null) {
        res.status(400).send("You can't start the delivery until the food isn't ready");
      } else {
        res.send(num);
      }})
      .catch(error => res.status(400).json({ error }));
};

exports.finishDelivery = (req, res) => {
  Order.findOneAndUpdate({ _id : req.params.id_order, status : "pending"}, 
    {status : "finish"},  {new : true})
    .then(num => {
      if (num == null) {
        res.status(400).send("You can't finish the delivery until the delivery didn't started");
      } else {
        res.send(num);
      }})
    .catch(error => res.status(400).json({ error }));
};

exports.delete = async (req, res) => {
	Order.deleteOne({_id : req.params.id_order})
  .then(response => {
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
.catch(error => res.status(400).json("Cannot delete"));
}



// exports.createOrUpdate = async (req, res) => {
//   const id_rest = req.params.id_rest; 

//   if (req.params.id_menu) {
//     var content = req.params.id_menu 
//     var prix = await Menu.findById(content).then(res => {
//       return res.prix
//     })
//   }
//   else{
//     var content = req.params.id_article 
//     var prix = await Article.findById(content).select("prix").then(res => {
//       return res.prix
//     })
//   }

//   Order.findOneAndUpdate({ id_restaurant : id_rest, email_customer: req.email},
//     {
//       id_restaurant : id_rest,
//       email_customer: req.email,
//       $push : {
//         content : content
//       },
//       $inc : {
//         prix : parseInt(prix)
//       },
//     },{upsert : true, new : true})
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the order."
//       });
//     });
// };
