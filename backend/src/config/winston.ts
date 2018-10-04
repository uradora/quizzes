import * as appRoot from "app-root-path"
import morgan from "morgan"
import split from "split"
import stream from "stream"
import winston from "winston"

const LOG_DIRECTORY = process.env.LOG_DIRECTORY || `${appRoot}/logs/`

const options = {
  file: {
    level: "info",
    filename: `${LOG_DIRECTORY}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
})

export default logger
