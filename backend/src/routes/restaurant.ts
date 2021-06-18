import { Router } from 'express'

const controllerRestaurant = require('../controllers/controllerRestaurant.ts')
const controllerMenu= require('../controllers/controllerMenu.ts')
const controllerArticle = require('../controllers/controllerArticle.ts')

const { Restaurant } = require('../models/modelMongo');

var router = Router();

var secureRole = async function (req,res,next) {
    if(req.role != "Restorer"){
        res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

var secureOwner = async function (req, res, next, id) {
    const user = req.email;
    Restaurant.findById(id)
    .then(data => {
        if( user != data.owner){
            res.status(400).send("Action non authorisé avec email")
        }       
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving Article."
    });
    });

    next();
}


router.get("/", (req, res) => {
    res.send('Bienvenue sur restaurant')
})

router.get("/getAll", controllerRestaurant.getAll)

router.get("/get/:id_rest", controllerRestaurant.findOne)

router.get("/:id_rest/menu", controllerMenu.getAll)

router.get("/:id_rest/menu/:id_menu", controllerMenu.findOne)

router.get("/:id_rest/article", controllerArticle.getAll)

router.get("/:id_rest/article/:id_article", controllerArticle.findOne)


router.use(secureRole)

router.post("/create", controllerRestaurant.create)

router.get("/getMine", controllerRestaurant.getMine)

router.param('id_rest', (req, res, next, id) => {
    secureOwner(req, res, next, id);
  })

router.put("/:id_rest", controllerRestaurant.update)

router.delete("/:id_rest", controllerRestaurant.delete)

router.post("/:id_rest/menu", controllerRestaurant.createMenu)

router.put("/:id_rest/menu/:id_menu", controllerMenu.update)

router.delete("/:id_rest/menu/:id_menu", controllerMenu.delete)

router.post("/:id_rest/article", controllerRestaurant.createArticle)

router.put("/:id_rest/article/:id_article", controllerArticle.update)

router.delete("/:id_rest/article/:id_article", controllerArticle.delete)

module.exports = router;
