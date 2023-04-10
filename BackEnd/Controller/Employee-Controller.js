const EmployeeModel = require('../modles/Employee-model');


const newEmployee = async (req, res) => {
  let newEmployee = new EmployeeModel({
    id: req.body.StaffID,
    Name: req.body.Name,
    NIC: req.body.NIC,
    DOB: req.body.DOB,
    Address: req.body.Address,
    JobTitle: req.body.JobTitle,
    Department: req.body.Department,
    ContactNumber:req.body.ContactNumber,
    BasicSalary:req.body.BasicSalary,
    Allowance:req.body.Allowance,
    OverTime:req.body.OverTime
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
  EmployeeModel
    .find()
    .then(Employee => res.json(Employee))
    .catch(err => res.status(404).json({ notfound: 'No Employee found' }));
};

const viewEmployeeById = async (req, res) => {
  let id = req.body.StaffID;
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

    const id = req.body.StaffID;
    const Name = req.body.Name;
    const NIC =  req.body.NIC;
    const DOB = req.body.DOB;
    const Address=req.body.Address;
    const JobTitle=req.body.JobTitle;
    const Department=req.body.Department;
    const ContactNumber=req.body.ContactNumber;
    const BasicSalary=req.body.BasicSalary;
    const Allowance=req.body.Allowance;
    const OverTime=req.body.OverTime;

  EmployeeModel.findOneAndUpdate(
    { id: id },
    {
        Name: Name,
        NIC: NIC,
        DOB: DOB,
        Address: Address,
        JobTitle: JobTitle,
        Department: Department,
        ContactNumber: ContactNumber,
        BasicSalary: BasicSalary,
        Allowance: Allowance,
        OverTime:OverTime
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
  const id = req.body.StaffID;

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
