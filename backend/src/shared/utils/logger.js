// logger.js
import chalk from "chalk";

let lastLogTime = Date.now();

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString(); // readable + sortable
};

const getTimeDiff = () => {
  const now = Date.now();
  const diff = now - lastLogTime;
  lastLogTime = now;
  return `+${diff}ms`;
};

const formatMessage = (level, message, meta) => {
  const time = getTimestamp();
  const diff = getTimeDiff();

  let base = `[${time}] [${level.toUpperCase()}] (${diff}) ${message}`;

  if (meta) {
    if (typeof meta === "object") {
      base += `\n${JSON.stringify(meta, null, 2)}`;
    } else {
      base += ` ${meta}`;
    }
  }

  return base;
};

const logger = {
  error: (msg, meta) => {
    console.error(chalk.red(formatMessage("error", msg, meta)));
  },

  warn: (msg, meta) => {
    console.warn(chalk.yellow(formatMessage("warn", msg, meta)));
  },

  info: (msg, meta) => {
    console.log(chalk.blue(formatMessage("info", msg, meta)));
  },

  success: (msg, meta) => {
    console.log(chalk.green(formatMessage("success", msg, meta)));
  },

  debug: (msg, meta) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(chalk.gray(formatMessage("debug", msg, meta)));
    }
  },

  silly: (msg, meta) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(chalk.magenta(formatMessage("silly", msg, meta)));
    }
  },
};

export default logger;
