const Payment = require('../modles/payment');

const addPayment = async (req,res) =>{

    const apartmentNo = req.body.apartmentNo;
    const category = req.body.category;
    const payee = req.body.payee;
    const amount = req.body.amount;

    const newPayment = new Payment({
        apartmentNo,
        category,
        payee,
        amount
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
    let apartmentNo = req.params.apartmentNo;
    
    Customer.findById(apartmentNo, (err, paymentModle) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
  
      return res.status(200).json({
        success: true,
        paymentModle,
      });
    });
  };

module.exports = {
    addPayment,
    viewPayment,
};



