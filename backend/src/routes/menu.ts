import { Router } from 'express'

const controllerMenu = require('../controllers/controllerMenu')
var router = Router();

var secure = async function (req,res,next) {
    if(req.role != "Restorer"){
        res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

router.get("/", (req, res) => {
    res.send('Bienvenue sur Menu')
})

router.get("/getAll", controllerMenu.getAll)

router.get("/get/:id", controllerMenu.findOne)


router.use(secure)


router.put("/update/:id", controllerMenu.update)

router.delete("/delete/:id", controllerMenu.delete)

module.exports = router;
