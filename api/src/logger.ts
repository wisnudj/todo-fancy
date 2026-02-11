import pino, { LoggerOptions } from "pino"

const isProd = process.env.NODE_ENV === "production"

const level = process.env.LOG_LEVEL ?? (isProd ? "info" : "debug")

const options: LoggerOptions = {
    level,
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "req.body.password",
            "req.body.pass",
            "req.body.token",
            "req.body.refreshToken",
            "req.body.accessToken",
            "user.password",
            "user.token",
        ],
        remove: true,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    serializers: {
        err: pino.stdSerializers.err
    },
    base: {
        service: process.env.APP_NAME ?? "todo-fancy",
        env: process.env.NODE_ENV ?? "development"
    },
}

const transport = isProd
    ? undefined
    : pino.transport({
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
            singleLine: true,
        },
    });

export const logger = pino(options, transport!);