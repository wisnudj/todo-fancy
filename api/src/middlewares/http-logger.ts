// httpLogger.ts
import pinoHttp from "pino-http";

import { randomUUID } from "crypto";
import { logger } from "../logger";

const httpLogger = pinoHttp({
    logger,
    genReqId: (req, _res) => {
        const incoming = req.headers["x-request-id"];
        const id = (Array.isArray(incoming) ? incoming[0] : incoming) ?? randomUUID();
        // res.setHeader("x-request-id", id); // pino-http might handle this, but explicit is fine.
        return id;
    },
    customLogLevel: function (_req, res, err) {
        if (err || res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
    },
    autoLogging: {
        ignore: (req) => req.url === "/health" || req.url === "/metrics",
    },
});

export default httpLogger