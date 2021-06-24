const express = require('express');
var router = express.Router();

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')

//Se connecter
router.post("/login", controllerMySQL.loginAccount)


module.exports = router;