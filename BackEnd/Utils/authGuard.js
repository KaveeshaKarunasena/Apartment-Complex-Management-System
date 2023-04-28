const {verifyToken} = require('../service/auth.service')

const authGuard = async (req, res, next) => {
    const authToken = req.headers['authorization'];
    
    if (!authToken) {
        return res.status(400).send({
            err: 'Forbinded Resources1'
        })
    }

    try {
        const payload = await verifyToken(authToken.split('Bearer ')[1]);
       
        req.user = payload;
        next();
    } catch(err) {
        return res.status(400).send({
            err: 'Forbinded Resources2'
        })
    }
}


module.exports = authGuard