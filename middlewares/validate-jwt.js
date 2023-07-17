const jwt = require('jsonwebtoken');

const validateJWT = (req, resp = response, next)=>{
    // First reaad the token
    const token = req.header('x-token');

    if(!token){
        return resp.status(401).json({
            ok: false,
            message: 'No token in petition'
        })
    }

    try {

        const{uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();        
    } catch (error) {
        return resp.status(401).json({
            ok: false,
            message: 'Invalid token'
        })
    }

}

module.exports = {
    validateJWT
}