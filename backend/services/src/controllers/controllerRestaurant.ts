export {};
const controllerMenu = require("./controllerMenu");

const { Restaurant, Menu, Article } = require('../models/modelMongo');

const addArticleToMenu = function(ArticleId : string, MenuId : string) {
  return Menu.findOneAndUpdate({ _id : MenuId },
    { 
      $push : { 
        article: ArticleId
      } 
    }, { new: true }
  ).populate('article');
};

const addArticleToRestaurant = function(ArticleId : string, RestaurantId : string, owner : string) {
  return Restaurant.findOneAndUpdate({_id : RestaurantId, owner : owner},
    { 
      $push : { 
        article: ArticleId
      } 
    }, { new: true }
  ).populate('article');
};

const addMenuToRestaurant = function(MenuId : string, RestaurantId : string, owner : string) {
  return Restaurant.findOneAndUpdate({_id : RestaurantId, owner : owner},
    { 
      $push : { 
        menu: MenuId
      } 
    }, { new: true }
  ).populate('menu');
};

// Create and Save a new Restaurant
exports.create = (req : any, res : any) => {
  
  // Create a Restaurant
  const rest = new Restaurant ({
    titre : req.body.titre,
    type : req.body.type,
    note: req.body.note,
    description: req.body.description,
    owner : req.email,
    picture : req.body.picture,
    pays : req.body.pays,
    ville : req.body.ville,
    rue : req.body.rue
  });

  rest.save()
    .then((data : any) => {
      res.status(200).send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restaurant."
      });
    });
};



// Create and Save a new menu on rest
exports.createMenu = async (req : any, res : any) => {
  const owner = req.email;
  const id_rest = req.params.id_rest;  
  const article = req.body.article.split(',')
  const men = new Menu ({
    titre : req.body.titre,
    id_restaurant : id_rest,
    description: req.body.description,
    picture : req.body.picture,
    prix : req.body.prix,
  });
  const newMenu = await men.save()

  for(var i=0; i<article.length; i++){
    const tutorial = await addArticleToMenu(article[i], newMenu._id)
  }
  
  const menuUpdate = await Menu.findById(newMenu._id).populate('article')
  addMenuToRestaurant(menuUpdate._id, id_rest, owner)
    .then((data : any) => {
      res.send(menuUpdate);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restaurant."
      });
    });
};

// Create and Save a new article on rest
exports.createArticle = async (req : any, res : any) => {
  const owner = req.email;
  const id_rest = req.params.id_rest;  
  const artc = new Article ({
    titre : req.body.titre,
    id_restaurant : id_rest,
    type : req.body.type,
    description: req.body.description,
    picture : req.body.picture,
    prix : req.body.prix,
  });
  const newArticle = await artc.save()

  addArticleToRestaurant(newArticle._id, id_rest, owner)
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restaurant."
      });
    });
};



exports.getAll = (req : any, res : any) => {
  Restaurant.find({})
    .then((data : any) => {
      res.json(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

exports.getMine = (req : any, res : any) => {
  const owner = req.email;
  Restaurant.find({owner: owner})
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

exports.findOne = (req : any, res : any) => {
  const id_rest = req.params.id_rest;
  Restaurant.findById(id_rest).populate("menu", "-__v").populate("article", " -__v")
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

exports.findOneMenu = (req : any, res : any) => {
  const id_menu = req.params.id_menu;
  Menu.findById(id_menu).populate('article')
    .then((data : any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

exports.update = (req : any, res : any) => {
  const owner = req.email;
  const filter = {_id : req.params.id_rest, owner : owner}
  const update = req.body;

  Restaurant.findOneAndUpdate(filter, update)
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
	Restaurant.deleteOne({ _id: req.params.id_rest, owner : req.email })
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

