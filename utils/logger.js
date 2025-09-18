const { createLogger, format, transports } = require('winston');
const { combine, timestamp,  printf, colorize, prettyPrint } = format;
require("winston-mongodb")

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] (${level}): ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        colorize(), 
        myFormat,
    ),

    transports: [
        new transports.Console(),
        new transports.File({filename: "./log/all-log.log"}),
        new transports.MongoDB({db: "mongodb+srv://baxtiyorrajabboyev013_db_user:WXYHvELo7MvQE9WS@cluster0.braehrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"})
    ]
})
   
module.exports = logger