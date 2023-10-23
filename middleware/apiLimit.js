import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req, res) => {
        console.log("api url", req.url)
        if (req.url === "/user/signIn" || req.url === "/user/signUp" || req.url === "/systemUser/signIn") return 5
        else return 100
    },
    message: {
        status: "UNSUCCES",
        message: "you made too many requests"
    },
    standardHeaders: true,
    legacyHeaders: false,
})