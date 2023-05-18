const Customer = require('../modles/Customer');

const addCart = async (req, res) => {
  console.log('h');
  const id = req.body.Id;
  const cart = req.body.product;
  console.log(id);
  try {
    const customer = await Customer.findById(id);

    if (!customer) return res.status(400).json({ msg: 'User does not exist' });

    // let newCart ={  cart.Id : }

    await Customer.findOneAndUpdate(
      { _id: id },
      {
        cart: cart,
      }
    );
    return res.json({ masg: 'Added to cart' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getCart = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const customer = await Customer.findById(id);

    if (!customer) return res.status(400).json({ msg: 'User does not exist' });

    return res.json(customer.cart);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCart = async (req, res) => {
  const id = req.params.id;
  const cart = req.params.itemId;
  console.log('jh');
  try {
    const customer = await Customer.findById(id);

    if (!customer) return res.status(400).json({ msg: 'User does not exist' });

    const index = customer.cart.findIndex(item => item._id == cart);
    // const newCart = customer.cart.filter(item => item._id != cart);
    const newCart = [...customer.cart];
    newCart.splice(index, 1);

    await Customer.findOneAndUpdate(
      { _id: id },
      {
        cart: newCart,
      }
    );
    return res.json({ msg: 'Item deleted' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addCart,
  getCart,
  deleteCart,
};
