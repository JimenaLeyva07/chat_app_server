const jwt = require ('jsonwebtoken');
//payload of JWT shouldn't have sensitive information

const generateJWT = (uid)=>{

    return new Promise((resolve, reject)=>{

        const payload = {
            uid
        };
    
        jwt.sign(payload,process.env.JWT_KEY, { //private key para firmar jwt
            expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                // token could not be created
                reject('JWT could not be generated');
            } else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}