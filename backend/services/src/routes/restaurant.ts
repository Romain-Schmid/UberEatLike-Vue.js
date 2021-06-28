import { Router } from 'express'

const controllerRestaurant = require('../controllers/controllerRestaurant.ts')
const controllerMenu= require('../controllers/controllerMenu.ts')
const controllerArticle = require('../controllers/controllerArticle.ts')
const controllerOrder = require('../controllers/controllerOrder.ts')

const { Restaurant } = require('../models/modelMongo');

var router = Router();

//Middleware 
var secureRole = async function (req,res,next) {
    if(req.role != "Restorer"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

//Middleware
var secureOwner = async function (req, res, next, id) {
    const user = req.email;
    Restaurant.findById(id)
    .then(data => {
        if( user != data.owner){
            return res.status(400).send("Action non authorisé avec email")
        }       
    })
    .catch(err => {
        return res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving Article."
    });
    });

    next();
}


router.get("/", (req, res) => {
    res.send('Bienvenue sur restaurant')
})

//Get Restaurants
router.get("/getAll", controllerRestaurant.getAll)
router.get("/get/:id_rest", controllerRestaurant.findOne)

//Get Menus
router.get("/:id_rest/menu", controllerMenu.getAll)
router.get("/:id_rest/menu/:id_menu", controllerMenu.findOne)

//Get Articles
router.get("/:id_rest/article", controllerArticle.getAll)
router.get("/:id_rest/article/:id_article", controllerArticle.findOne)


router.use(secureRole)

//Read and Get own restaurants
router.post("/create", controllerRestaurant.create)
router.get("/getMine", controllerRestaurant.getMine)

router.param('id_rest', (req, res, next, id) => {
    secureOwner(req, res, next, id);
  })


//Edit Restaurant
router.put("/:id_rest", controllerRestaurant.update)
router.delete("/:id_rest", controllerRestaurant.delete)

//Edit Menu
router.post("/:id_rest/menu", controllerRestaurant.createMenu)
router.put("/:id_rest/menu/:id_menu", controllerMenu.update)
router.delete("/:id_rest/menu/:id_menu", controllerMenu.delete)

//Edit Articles
router.post("/:id_rest/article", controllerRestaurant.createArticle)
router.put("/:id_rest/article/:id_article", controllerArticle.update)
router.delete("/:id_rest/article/:id_article", controllerArticle.delete)

module.exports = router;
