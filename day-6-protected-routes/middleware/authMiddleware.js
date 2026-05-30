const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (
            authHeader &&
            authHeader.startsWith("Bearer")
        ) {
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(
                token, 
                process.env.JWT_SECRET
            );
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                message: "Not authorized",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

module.exports = protect;