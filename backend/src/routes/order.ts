import { Router } from 'express'

const controllerOrder = require('../controllers/controllerOrder.ts')
var router = Router();

//Middleware 
var secureCustomer = async function (req,res,next) {
    if(req.role != "Customer"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

var secureRestorer = async function (req,res,next) {
    if(req.role != "Restorer"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

var secureDeliveryMan = async function (req,res,next) {
    if(req.role != "DeliveryMan"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

router.get("/", (req, res) => {
    res.send('Bienvenue sur Order')
})

router.get("/getAll", controllerOrder.getAll)

router.get("/get/:id_order", controllerOrder.findOne)

router.post("/create", secureCustomer, controllerOrder.create)

router.put("/paid/:id_order", secureCustomer, controllerOrder.paid)

router.put("/update/:id_order", secureCustomer, controllerOrder.update)

router.delete("/delete/:id_order", secureCustomer, controllerOrder.delete)

//restorer  
router.get('/:id_rest/getAll', secureRestorer, controllerOrder.getAll)
router.get('/:id_rest/get/:id_order', secureRestorer, controllerOrder.findOne)
router.put('/:id_rest/ready/:id_order', secureRestorer, controllerOrder.ready)

//DeliveryMan
router.put('/valider/:id_order', secureDeliveryMan, controllerOrder.validate)
router.get('/getMine', secureDeliveryMan, controllerOrder.getMyDelivery)
router.put('/start/:id_order', secureDeliveryMan, controllerOrder.startDelivery)
router.put('/finish/:id_order', secureDeliveryMan, controllerOrder.finishDelivery)


module.exports = router;
