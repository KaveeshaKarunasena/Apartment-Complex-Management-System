const EmployeeModel = require('../modles/Employee-model');
const mongoType = require('mongoose').Types;

const newEmployee = async (req, res) => {
  let newEmployee = new EmployeeModel({
    name: req.body.name,
    nic: req.body.nic,
    dob: req.body.dob,
    address: req.body.address,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    contactNumber: req.body.contactNumber,
    basicSalary: req.body.basicSalary,
    allowance: req.body.allowance,
    overtime: req.body.overtime,
  });

  newEmployee.save(function (err, newEmployee) {
    if (err) res.send(err);
    else
      res.send({
        status: 200,
        message: 'Employee is Successfully Added',
        cusObj: newEmployee,
      });
  });
};

const viewEmployee = async (req, res) => {
  EmployeeModel.find()
    .then(Employee => res.json(Employee))
    .catch(err => res.status(404).json({ notfound: 'No Employee found' }));
};

const viewEmployeeById = async (req, res) => {
  let id = req.params.id;
  EmployeeModel.findById(id, (err, EmployeeModel) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      EmployeeModel,
    });
  });
};
const viewEmployeeByname = async (req, res) => {
  let name = req.body.Name;
  EmployeeModel.findByname(name, (err, EmployeeModel) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      EmployeeModel,
    });
  });
};

const updateEmployee = async (req, res) => {
  const id = req.params._id;

  const updatedEmployee = {
    name: req.body.name,
    nic: req.body.nic,
    dob: req.body.dob,
    address: req.body.address,
    jobTitle: req.body.jobTitle,
    department: req.body.department,
    contactNumber: req.body.contactNumber,
    basicSalary: req.body.basicSalary,
    allowance: req.body.allowance,
    overtime: req.body.overtime,
  };

  if (!mongoType.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID');
  }

  const employee = await EmployeeModel.findById(id);

  if (!employee) {
    return res.status(404).send('employee not found');
  }

  EmployeeModel.findByIdAndUpdate(
    id,
    updatedEmployee,
    {
      new: true,
    },
    function (err, response) {
      if (err) res.send(err);
      else
        res.send({
          status: 200,
          message: 'Employee updated',
          Employee: response,
        });
    }
  );
};

const DeleteEmployee = async (req, res) => {
  const id = req.params.id;

  EmployeeModel.findByIdAndDelete(id, function (err, response) {
    if (err) res.send(err);
    else
      res.send({
        status: 200,
        message: 'Emloyee deleted',
        Employee: response,
      });
  });
};

module.exports = {
  newEmployee,
  viewEmployee,
  viewEmployeeById,
  viewEmployeeByname,
  updateEmployee,
  DeleteEmployee,
};
