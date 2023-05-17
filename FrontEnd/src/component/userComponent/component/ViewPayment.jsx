import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { AuthContext } from '../../AuthProvider';
import jwt_decode from 'jwt-decode';

function ViewPayment() {
  const [payment, setPayment] = useState([]);
  const [search, setSearch] = useState('');

  const keys = ['apartmentno', 'category', 'amount'];

  let authPayload = useContext(AuthContext);
  const decoded = jwt_decode(authPayload.token);
  const apartmentNo = decoded.apartmentNo;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/addPayment/getPayment/${apartmentNo}`);
        const json = await response.json();

        if (response.ok) {
          setPayment(json);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [apartmentNo]);

  return (
    <div style={{ height: '100vh' }}>
      <form>
        <InputGroup
          className="my-3"
          style={{
            paddingTop: '50px',
            padding: 5,
            justifyContent: 'normal',
            fontSize: 20,
            margin: 1,
            width: '260px',
            height: '40px',
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
              <TableCell align="center">Apartment No</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payment &&
              payment
                .filter(data => {
                  return search.toLowerCase() === ''
                    ? data
                    : keys.some(
                        key =>
                          data[key]?.toLowerCase()?.includes(search.toLowerCase()) || '' // Provide a default empty string for undefined data
                      );
                })
                .map(data => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{data.apartmentNo}</TableCell>
                    <TableCell align="center">{data.category}</TableCell>
                    <TableCell align="center">{data.amount}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewPayment;