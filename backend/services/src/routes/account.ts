import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')
var router = Router();

var secureCommercial= async function (req : any, res : any, next : any) {
    if(req.role != "Commercial"){
        return res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}
router.get("/", (req : any, res : any) => {
    res.send('Bienvenue sur Account')
})

router.put("/update", controllerMySQL.update)

router.get("/getMe", controllerMySQL.findMe)

router.delete('/logout', controllerMySQL.logout)

router.delete("/delete", controllerMySQL.delete)


//Route Commerciale
router.get("/getAll",secureCommercial, controllerMySQL.findAll)
router.get("/get/:id",secureCommercial, controllerMySQL.findOne)
router.delete("/delete/:id",secureCommercial, controllerMySQL.deleteAccount)
router.put("/update/:id",secureCommercial, controllerMySQL.updateAccount)



module.exports = router;
