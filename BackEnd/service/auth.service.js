const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
const APP_SECRET = 'my-todo-app-secret';
const APP_ACCESS_TOKEN_EXP_SECS = 3600;
const JWT_OPTIONS = {
    algorithm: "HS256",
    issuer: "mytodoapp.com/api",
    audience: "mytodoapp.com",
    expiresIn: APP_ACCESS_TOKEN_EXP_SECS,
}


function createPasswordHash(password){

    return bcrypt.hash(password , 10);
}

async function validatePassword (password , hash){
    return await bcrypt.compare(password , hash)
}

async function signToken(password , hash , payload){
    const isValidPassword = await validatePassword(password , hash)
    if (!isValidPassword){
        throw new Error('Invalid Password');
    }
else{
    const token = await jwt.sign(payload , APP_SECRET, JWT_OPTIONS );
    return {
        token,
        life: APP_ACCESS_TOKEN_EXP_SECS,
    }
}
   
}

async function verifyToken(token) {
    // console.log(token)
    // console.log(APP_SECRET)
    const payload = await jwt.verify(token, APP_SECRET, JWT_OPTIONS);
    //console.log(payload);
     console.log({payload})
    
    return payload;
    //console log this
}


module.exports = {
    verifyToken,
    signToken,
    validatePassword,
    createPasswordHash
}