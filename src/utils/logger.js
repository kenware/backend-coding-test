
const winston = require('winston');

const format = winston.format;

const logFormat = format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
    format.splat(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat,
      ),
    })
  ],
});

module.exports = logger;
