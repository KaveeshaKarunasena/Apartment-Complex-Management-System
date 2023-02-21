import React from 'react';
import './NavPages.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useEffect } from 'react';
import { useState, setHasError } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

function ViewApaertment() {
  const [apartment, setApartment] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const keys = ['apartmentno', 'type', 'status'];

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch('/apartment/view');
      const json = await response.json();

      if (response.ok) {
        setApartment(json);
      }
    };

    fetchDetails();
  }, []);

  const deleteDetails = async id => {
    await axios
      .delete(`/apartment/delete/${id}`)
      .then(() => {
        alert('Deleted');
        window.location.reload();
      })
      .catch(err => alert(err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, apartment.length - page * rowsPerPage);

  return (
    <div className="Tablecontainer">
      <form>
        <InputGroup className="my-3" style={{
              padding: 5,
              justifyContent: "normal",
              fontSize: 20,
              color: "blue",
              margin: 1,
              width: "250px",
              BorderColor: "green",
              borderWidth: "10px"
            }}>
          {/* onChange for search */}
          <Form.Control
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts"
            
          />
        </InputGroup>
      </form>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Apartment No</TableCell>
              <TableCell align="center">Floor&nbsp;</TableCell>
              <TableCell align="center">Building No&nbsp;</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Owner Name&nbsp;</TableCell>
              <TableCell align="center">Status&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartment &&
              apartment
                .filter(data => {
                  return search.toLowerCase() === ''
                    ? data
                    : keys.some(key =>
                        data[key].toLowerCase().includes(search)
                      );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{data.apartmentno}</TableCell>
                    <TableCell align="center">{data.floor}</TableCell>
                    <TableCell align="center">{data.buildingNo}</TableCell>
                    <TableCell align="center">{data.type}</TableCell>
                    <TableCell align="center">{data.ownersName}</TableCell>
                    <TableCell align="center">{data.status}</TableCell>
                    <TableCell align="center">
                      <a
                        href={`edit/${data._id}`}
                        class="edit"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <i class="material-icons">
                          <EditIcon style={{ color: 'orange' }} />
                        </i>
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      <a
                        href="#"
                        class="delete"
                        title="Delete"
                        data-toggle="tooltip"
                      >
                        <i
                          class="material-icons"
                          onClick={() => deleteDetails(data._id)}
                        >
                          <DeleteIcon style={{ color: 'red' }} />
                        </i>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={apartment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default ViewApaertment;
