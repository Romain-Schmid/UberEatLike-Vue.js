import { Router } from 'express'

const controllerMySQL = require('../controllers/controllerLoginAuth.ts')
var router = Router();
const dockerstats = require('dockerstats');
const getId = require('docker-container-id');

function getDockerId () {
    return getId().then((id : any) => {
        if (!id) {
            return null;
        }
        return "518b921ebd52";
    });
}

router.get("/", (req : any, res : any) => {
    res.send('Bienvenue sur stats')
})

router.get("/getInfo", (req : any, res : any) => {
    dockerstats.dockerContainerStats('d00652fd7a3f', function(data : any) {
        res.json({
            '- ID: ' : data.id,
            '- Mem usage: ' : data.memUsage,
            '- Mem limit: ' : data.memLimit,
            '- Mem usage %: ' : data.memPercen,
            '- CPU usage %: ' : data.cpuPercent      
        })
        console.log('Docker Container Stats:');
        console.log('- ID: ' + data.id);
        console.log('- Mem usage: ' + data.memUsage);
        console.log('- Mem limit: ' + data.memLimit);
        console.log('- Mem usage %: ' + data.memPercent);
        console.log('- CPU usage %: ' + data.cpuPercent);
    })
})

module.exports = router;
