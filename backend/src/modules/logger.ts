const {createLogger, format, transports} = require('winston');

const logger = createLogger({
    level : 'info',
    exitOnError : false,
    format : format.json(),
    transport : [
        new transports.File({ filename : './mylogfiles/bad-token.log'})
    ]
});

module.exports = logger;