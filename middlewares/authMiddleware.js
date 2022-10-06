const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

    try {
        const token = req.headers["authorization"].split(" ")[1];
        // const token = req.body.token;

        jwt.verify(token, process.env.JWT_KEY, (err, val) => {
            if (err) {
                return res
                    .status(401)
                    .send({
                        message: "Auth Failed",
                        success: false
                    })
            }
            else {
                req.body.userId = val.id;
                next();
            }
        })
    } catch (error) {

        console.log(error);

        return res.status(401).send({
            message: "Auth Failed",
            success: false
        })
    }

};