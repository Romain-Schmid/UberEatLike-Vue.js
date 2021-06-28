const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    level : 'info',
    exitOnError : false,
    format : format.json(),
    transport : [
        new transports.Console(),
        new transports.File({ filename : './mylogfiles/connection.log'})
    ]
});

module.exports = logger;