const User = require('../modles/Customer.js')
const { createPasswordHash, signToken } =require('./auth.service.js') 


async function findUserByApartmentNo(apartmentNo){

    const existingUser = await User.findOne({
        apartmentNo
    })

    return existingUser;
}


 async function register(fname , lname , email , password){

    const hash = await createPasswordHash(password);
    const newUser = new User({
        fname,
        lname,
        email,
        password: hash
    });
    
    await newUser.save();
    const userCpy =  JSON.parse(JSON.stringify(newUser));

    //delete userCpy?.password
    return userCpy

}

async function login(apartmentNo , password){

    const acc = await User.findOne({ apartmentNo})
    console.log(acc)
    if (!acc){
        throw new Error ('User Not Found');
    }

    
    const payload = await signToken(password, acc.password, {
        apartmentNo: acc.apartmentNo,
        id: acc._id.toString(),
    });

    return payload;

}


module.exports = {
    findUserByApartmentNo,
    register,
    login
}