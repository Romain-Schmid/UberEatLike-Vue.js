export {}
const {createLogger, format, transports} = require('winston');

const logge = createLogger({
    level : 'info',
    exitOnError : false,
    format : format.json(),
    transport : [
        new transports.File({ filename : './mylogfiles/bad-token.log'})
    ]
});

module.exports = logge;