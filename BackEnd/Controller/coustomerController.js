const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

const Customer = require( "../modles/Customer");
const UserService = require('../service/customer-service')


const newSignUp = async (req,res)=>{

    const name = req.body.name;
    const apartmentNo = req.body.apartmentNo;
    const nicNo = req.body.nicNo;
    const phoneNo = Number(req.body.phoneNo);
    const email = req.body.email;
    const password = req.body.password;
    //const image = Buffer(req.body.image);

    const existingUser = await UserService.findUserByApartmentNo(apartmentNo);

    if (existingUser) {
        return res.status(400).send({
          err: "User already Exits",
        });
      }
    
    const hash =  await bcrypt.hash(password , 10);

    const newCustomer = new Customer({

        name,
        apartmentNo,
        nicNo,
        phoneNo,
        email,
        password:hash
        //image

    })

    newCustomer.save().then(() => {
        res.json("Customer Added")
       
    }).catch((err) => {
        console.log(err);
    })
};

const login = async (req,res,session) =>{
    try {
        const { apartmentNo, password } = req.body;
    
        const LoggedUser =  await UserService.login(apartmentNo , password);
    
        res.status(200).send(LoggedUser);
    
      } catch (err) {
            res.status(400).send({ err: err.message})
    
      }
    
};

const viewProfileById = async (req,res) => {
    const curntUser  = req.user;
    //console.log(currntUser);
    try{
        
        if(!curntUser){
            return res.status(400).send({ err: 'User Not Logged In'});
        }

        const userDoc = await UserService.findUserByEmail(curntUser._id);
        const user = userDoc?.toJSON();
    
        delete user?.password;
        res.status(200).json(user);

    }catch(err){
        res.status(400).send({ err: err });

    }

   
};

const updateProfileById = async (req,res) => {

    let userID = req.params.id;

    //Dstructure
    const {name,apartmentNo,nicNo,phoneNo,email,password} = req.body;

    const updateCustomer = {

        name,
        apartmentNo,
        nicNo,
        phoneNo,
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

const resetPassword = async (req,res)  =>{
    try {
                
        const { email, password } = req.body;
        
        try {
            
            Customer.findOne({ email})
                .then(customer => {
                    bcrypt.hash(password , 10)
                        .then(hash => {
                            Customer.updateOne({ email : customer.email },
                            { password: hash}, function(err, data){
                                if(err) throw err;
                                    return res.status(201).send({ msg : "Record Updated...!"})
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Customer not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }


}
module.exports= {
    newSignUp,
    login,
    viewProfileById,
    updateProfileById,
    deleteProfile,
    viewProfiles,
    resetPassword,
};