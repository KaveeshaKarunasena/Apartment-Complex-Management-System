const User = require('../modles/Customer.js')
const { createPasswordHash, signToken } =require('./auth.service.js') 


async function findUserByApartmentNo(apartmentNo){

    const existingUser = await User.findOne({
        apartmentNo
    })

    return existingUser;
}


//  async function register(name , apartmentNo , email , phoneNo , nicNo , confPassword , password){

//     const hash = await createPasswordHash(password);
//     const newUser = new User({
//         name,
//         apartmentNo,
//         email,
//         phoneNo,
//         nicNo,
//         confPassword,
//         password: hash
//     });
    
//     await newUser.save();
//     const userCpy =  JSON.parse(JSON.stringify(newUser));

//     //delete userCpy?.password
//     return userCpy

// }

async function login(apartmentNo , password){

    const acc = await User.findOne({apartmentNo: apartmentNo})
   
    if (!acc){
        throw new Error ('User Not Found');
    }
    
    
    const payload = await signToken(password, acc.password, {
        apartmentNo: acc.apartmentNo,
        email : acc.email,
        id: acc._id.toString()
    });

    return payload;

}


module.exports = {
    findUserByApartmentNo,
    // register,
    login
}