import React from 'react';
import { useState, useEffect } from 'react';
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
import axios from 'axios';
import moment from 'moment';

const CostTable = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [apartmentCost, setApartmentCost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/maintenance/costDetails');
      setApartmentCost(data);
      console.log('resss', data);
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, apartmentCost.length - page * rowsPerPage);

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
        </InputGroup>
      </form>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Apartment No</TableCell>
              <TableCell align="center">Type&nbsp;</TableCell>
              <TableCell align="center">Owners Name&nbsp;</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Total&nbsp;</TableCell>
              <TableCell align="center">Date&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartmentCost.details &&
              apartmentCost.details
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{data._id}</TableCell>
                    <TableCell align="center">{data.type}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.description}</TableCell>
                    <TableCell align="center">{data.total}</TableCell>
                    <TableCell align="center">{moment(data.date).format('YYYY-MM-DD')}</TableCell>
                   
                  </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={apartmentCost.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default CostTable;
