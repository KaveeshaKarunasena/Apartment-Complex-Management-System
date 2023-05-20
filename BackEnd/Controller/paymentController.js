const Payment = require('../modles/payment');

const addPayment = async (req, res) => {
  const apartmentNo = req.body.apartmentNo;
  const category = req.body.category;
  const payeeId = req.body.payeeId;
  const amount = +req.body.amount;
  const currentDate = new Date();

  const newPayment = new Payment({
    apartmentNo,
    category,
    payeeId,
    amount,
    createdAt: currentDate,
  });

  newPayment
    .save()
    .then(() => {
      res.json('Payment Done');
    })
    .catch(err => {
      res.json(err);
    });
};

const viewPayment = async (req, res) => {
  const apartmentNo = req.query.apartmentNo;
  const month = +req.query.month + 1;
  const year = +req.query.year;

  try {
    const apartment = await Payment.aggregate([
      {
        $match: {
          apartmentNo: apartmentNo,
        },
      },
      {
        $addFields: {
          month: {
            $month: { $toDate: '$createdAt' }
          },
          year: {
            $year:{ $toDate: '$createdAt'  }
          }
        },
      },
      {
        $match: {
          month: month,
          year: year
        },
      },
    ]);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    console.log(apartment);

    res.json(apartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const viewAllPayment = async (req, res) => {
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
  viewAllPayment,
};
