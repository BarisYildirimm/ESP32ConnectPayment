export const checkUserTest = async (req, res) => {
    try {
        console.log(req.headers)
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const userAgent = req.headers["user-agent"];
        res.json({
            ip: ip,
            userAgent: userAgent
        })
    } catch (error) {
        res.json({
            errorMessage: error
        })
    }
}