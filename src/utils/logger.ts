import pino from "pino";
import dayjs from "dayjs";
import  destination  from "pino-pretty"

const log = pino({
   transport: {
    target: 'pino-pretty'
  },
  level: "info",
  base: { pid: false },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  prettifier: destination(),
});

export default log;
