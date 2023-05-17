const Payment = require('../modles/payment');

const addPayment = async (req,res) =>{

    const apartmentNo = req.body.apartmentNo;
    const category = req.body.category;
    const payee = req.body.payee;
    const amount = +req.body.amount;
    const currentDate = new Date()
  

    const newPayment = new Payment({
        apartmentNo,
        category,
        payee,
        amount,
        createdAt: currentDate
    });

    newPayment
        .save()
        .then(()=>{
            res.json('Payment Done')
        })
        .catch(err=>{
            res.json(err)
        })
};

const viewPayment = async (req, res) => {
  const { apartmentNo } = req.params; 

  try {
    const apartment = await Payment.find({ apartmentNo });

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    res.json(apartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
    addPayment,
    viewPayment,
};



