const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

const Customer = require( "../modles/Customer");


const newSignUp = async (req,res)=>{

    const name = req.body.name;
    const apartmentNo = req.body.apartmentNo;
    const nicNo = req.body.nicNo;
    const phoneNo = Number(req.body.phoneNo);
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password,10);
    //const image = Buffer(req.body.image);

    const newCustomer = new Customer({

        name,
        apartmentNo,
        nicNo,
        phoneNo,
        email,
        password
        //image

    })

    newCustomer.save().then(() => {
        res.json("Customer Added")
       
    }).catch((err) => {
        console.log(err);
    })
};

const login = async (req,res,session) =>{
    const apartmentNumber = req.body.apartmentNO;
    const hashPassword = await bcrypt.hash(req.body.password,10);
    
    const user = Customer.findOne({
        apartmentNo: apartmentNumber,
        password: hashPassword})
        .select('password')
        .exec();

    if(!user){
        throw new Error('Wrong username or password');
    }
    else{
        res.status(200).send({status:"Success!"})
    }
    
    
};

const viewProfileById = async (req,res) => {
    let userID = req.params.id;
    const user = Customer.findById(userID).then((customer) => {
        res.json(customer)
        //res.status(200).send({status:"User fetched", user:user})
    }).catch((err) => {
        res.status(500).send({status:"Error with get user", error:err.message });
    })

   
};

const updateProfileById = async (req,res) => {

    let userID = req.params.id;

    //Dstructure
    const {name,apartmentNO,nicNO,phoneNO,email,password} = req.body;

    const updateCustomer = {

        name,
        apartmentNO,
        nicNO,
        phoneNO,
        email,
        password
        //image

    }

    //Search the that id is available or not
    const update =  Customer.findByIdAndUpdate(userID, updateCustomer).then((customer) => {

        //status = 200 = updated
        res.status(200).send({status:"User Updated", user:update})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});

    })

};

const deleteProfile = async (req,res) => {

    let userID = req.params.id;

     Customer.findByIdAndDelete(userID).then(() => {
        res.status(200).send({status:"User deleted"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message});
    })

};

const viewProfiles = async (req,res)=>{
    Customer.find().then(customers => {
        res.json(customers)
    }).catch((err)=>{
        console.log(err);
    })

    console.log("Hello")
};

function createAccessToken(nicNO){
    return jwt.sign({
        nicNO: nicNO
    },process.env.ACCESS_TOKEN_SECRET, {
        epiresIn: '10m'
    });
}

function createRefreshTaken(nicNO, refreshTakenId){
    return jwt.sign({
        nicNO: nicNO,
        takenId: refreshTakenId
    },process.env.REFRESH_TOKEN_SECRET, {
        epiresIn: '30d'
    });
}

module.exports= {
    newSignUp,
    login,
    viewProfileById,
    updateProfileById,
    deleteProfile,
    viewProfiles,
};