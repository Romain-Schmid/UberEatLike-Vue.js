import { Router } from 'express'

const controllerOrder = require('../controllers/controllerOrder.ts')
var router = Router();
const { Restaurant } = require('../models/modelMongo');

//Middleware 
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

var secureCustomer = async function (req : any, res : any, next : any) {
    console.log(req.role != "Customer")
    if(req.role != "Customer"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}


var secureRestorer = async function (req : any, res : any, next : any) {
    if(req.role != "Restorer"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

var secureDeliveryMan = async function (req : any, res : any, next : any) {
    if(req.role != "DeliveryMan"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

router.get("/", (req : any, res : any) => {
    res.send('Bienvenue sur Order')
})

router.get("/getAll", controllerOrder.getAll)

router.get("/get/:id_order", controllerOrder.findOne)

router.post("/create", secureCustomer, controllerOrder.create)

router.put("/paid/:id_order", secureCustomer, controllerOrder.paid)

router.put("/update/:id_order", secureCustomer, controllerOrder.update)

router.delete("/delete/:id_order", secureCustomer, controllerOrder.delete)

//restorer  
router.get('/:id_rest/getAll', secureOwner, controllerOrder.getAll)
router.get('/:id_rest/get/:id_order', secureOwner, controllerOrder.findOne)
router.put('/:id_rest/ready/:id_order', secureOwner, controllerOrder.ready)

//DeliveryMan
router.put('/valider/:id_order', secureDeliveryMan, controllerOrder.validate)
router.get('/getMine', secureDeliveryMan, controllerOrder.getMyDelivery)
router.put('/start/:id_order', secureDeliveryMan, controllerOrder.startDelivery)
router.put('/finish/:id_order', secureDeliveryMan, controllerOrder.finishDelivery)


module.exports = router;
