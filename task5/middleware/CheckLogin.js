const jwt = require("jsonwebtoken")
exports.CheckLogin = async (req, res, next) => {
    try {
        const { token } = req.cookies || req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "please login before access all the data ofr the user ",
            })

        }

        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("YE VHI DATA HAI JO PAYLOAD ME DEAYA HAI")
        if (!tokenPayload) {
            return res.status(500).json({
                success: false,
                message: "Token is wrong ",

            })
        }
        next();



    }
    catch (err) {
        console.log("check login middleware me fat gya hai", err);
        return res.status(500).json({
            success: false,
            message: "Token ko verify nhi kar paa rha hai hamara JWT_SECRET",
            error: err.message
        })
    }
}