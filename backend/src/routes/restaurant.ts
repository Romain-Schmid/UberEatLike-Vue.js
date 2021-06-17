import { Router } from 'express'

const controllerRestaurant = require('../controllers/controllerRestaurant.ts')
var router = Router();

var secure = async function (req,res,next) {
    if(req.role != "Restorer"){
        res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

router.get("/", (req, res) => {
    res.send('Bienvenue sur restaurant')
})

router.get("/getAll", controllerRestaurant.getAll)

router.get("/get/:id", controllerRestaurant.findOne)


router.use(secure)

router.post("/create", controllerRestaurant.create)

router.get("/getMine", controllerRestaurant.getMine)

router.put("/update", controllerRestaurant.update)


module.exports = router;
