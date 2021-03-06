import { Router } from 'express'

const controllerRestaurant = require('../controllers/controllerRestaurant.ts')
const controllerMenu= require('../controllers/controllerMenu.ts')
const controllerArticle = require('../controllers/controllerArticle.ts')
const controllerOrder = require('../controllers/controllerOrder.ts')

const { Restaurant } = require('../models/modelMongo');

var router = Router();

//Middleware 
var secureRole = async function (req : any, res : any, next : any) {
    if(req.role != "Restorer"){
        return res.status(400).send("Action non authorisée avec votre rôle")
    }    
    next();
}

//Middleware
var secureOwner = async function (req : any, res : any, next : any) {
    const user = req.email;
    const id = req.params.id_rest
    Restaurant.findById(id)
    .then((data : any) => {
        if( user != data.owner){
            return res.status(400).send("Action non authorisée avec email")
        }       
    })
    .catch((err: any) => 
        {
            return res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Article."
        });
    });

    next();
}


router.get("/", (req : any, res : any) => {
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



//Read and Get own restaurants
router.post("/create", controllerRestaurant.create)
router.get("/getMine", controllerRestaurant.getMine)

// router.param('id_rest', (req : any, res : any, next : any, id : string) => {
//     secureOwner(req, res, next, id);
//   })


//Edit Restaurant
router.put("/:id_rest", secureOwner, controllerRestaurant.update)
router.delete("/:id_rest", secureOwner, controllerRestaurant.delete)

//Edit Menu
router.post("/:id_rest/menu", secureOwner, controllerRestaurant.createMenu)
router.put("/:id_rest/menu/:id_menu", secureOwner,  controllerMenu.update)
router.delete("/:id_rest/menu/:id_menu", secureOwner, controllerMenu.delete)

//Edit Articles
router.post("/:id_rest/article", secureOwner, controllerRestaurant.createArticle)
router.put("/:id_rest/article/:id_article", secureOwner, controllerArticle.update)
router.delete("/:id_rest/article/:id_article", secureOwner, controllerArticle.delete)

module.exports = router;
