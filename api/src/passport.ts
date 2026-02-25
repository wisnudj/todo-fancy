import passport from "passport"
import { Strategy } from "passport-http-bearer"
import { verify } from "./services/auth-service"

passport.use(new Strategy(
    async (token, cb) => {
        try {
            const userId = await verify(token)
            cb(null, { id: userId })
        }
        catch(err) {
            cb(err)
        }
    }
))

export default passport