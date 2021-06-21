import { Router } from 'express'

const controllerArticle = require('../controllers/controllerArticle')
var router = Router();

var secure = async function (req,res,next) {
    if(req.role != "Restorer"){
        res.status(400).send("Action non authorisé avec votre rôle")
    }    
    next();
}

router.get("/", (req, res) => {
    res.send('Bienvenue sur article')
})

router.get("/getAll", controllerArticle.getAll)

router.get("/get/:id", controllerArticle.findOne)


router.use(secure)

router.put("/update/:id", controllerArticle.update)

router.delete("/delete/:id", controllerArticle.delete)


module.exports = router;
