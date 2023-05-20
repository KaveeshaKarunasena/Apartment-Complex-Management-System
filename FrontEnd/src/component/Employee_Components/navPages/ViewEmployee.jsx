import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useEffect } from 'react';
import { useState, setHasError } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Popup from './Popup';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function ViewEmployee() {
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openPopup, setOpenPopup] = useState(false);
  const [getId, setGetId] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [display, setdisplay] = useState(false);
  const keys = [
    'id',
    'Name',
    'NIC',
    'DOB',
    'Address',
    'JobTitle',
    'Department',
    'ContactNumber',
    'BasicSalary',
    'Allowance',
    'Overtime',
  ];
  const [deleteId, setDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch('/employee/view');
      const json = await response.json();

      if (response.ok) {
        setEmployee(json);
        setdisplay(true);
      }
    };

    fetchDetails();
  }, [display]);

  const deleteDetails = id => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    await axios
      .delete(`/employee/delete/${deleteId}`)
      .then(() => {
        const employeeCopy = [...employee];
        const filteredEmployee = employeeCopy.filter(item => item._id !== deleteId);
        setEmployee(filteredEmployee);
        enqueueSnackbar('Successfully Deleted', { variant: 'error' });
      })
      .catch(err => enqueueSnackbar(err, { variant: 'error' }));

    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleProps = id => {
    setGetId(id);
    setOpenPopup(true);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, employee.length - page * rowsPerPage);

  return (
    <div>
      <form>
        <InputGroup
          className="my-3"
          style={{
            paddingTop: 50,
            padding: 5,
            justifyContent: 'normal',
            fontSize: 20,
            color: 'blue',
            margin: 1,
            width: '250px',
            BorderColor: 'green',
            borderWidth: '10px',
          }}
        >
          {/* onChange for search */}
          <Form.Control
            onChange={e => setSearch(e.target.value)}
            placeholder="Search...."
          />
        </InputGroup>
      </form>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name&nbsp;</TableCell>
              <TableCell align="center">NIC No&nbsp;</TableCell>
              <TableCell align="center">DOB</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Department&nbsp;</TableCell>
              <TableCell align="center">Job Title&nbsp;</TableCell>
              <TableCell align="center">ContactNumber&nbsp;</TableCell>
              <TableCell align="center">BasicSalary&nbsp;</TableCell>
              <TableCell align="center">OverTime-Rate&nbsp;</TableCell>
              <TableCell align="center">OverTime&nbsp;</TableCell>
              <TableCell align="center" colSpan={2}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee &&
              employee
                .filter(data => {
                  return (
                    search.toLowerCase() === '' ||
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.nic.toLowerCase().includes(search.toLowerCase()) ||
                    data.address.toLowerCase().includes(search.toLowerCase()) ||
                    data.department.toLowerCase().includes(search.toLowerCase()) ||
                    data.jobTitle.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => (
                  <TableRow key={data._id}>
                    <TableCell align="center">
                      {data.name || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.nic || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.dob || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.address || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.department || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.jobTitle || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.contactNumber || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.basicSalary || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.allowance || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      {data.overtime || 'not found'}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleProps(data._id)}>
                        <EditIcon style={{ color: 'orange' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteDetails(data._id)}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: emptyRows }}>
                <TableCell colSpan={13} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employee.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        apartment={employee}
        setApartment={setEmployee}
        getId={getId}
      ></Popup>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewEmployee;
