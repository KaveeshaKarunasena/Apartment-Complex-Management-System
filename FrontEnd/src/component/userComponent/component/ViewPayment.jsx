import React, { useState, useContext, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import moment from 'moment';
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
        const response = await fetch(`/addPayment/allPayment/${apartmentNo}`);
        const json = await response.json();

        if (response.ok) {
          const paymentsWithDate = json.map(payment => ({
            ...payment,
            createAt: moment(payment.createdAt).format('YYYY-MM-DD')
          }));

          setPayment(paymentsWithDate);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [apartmentNo]);

  return (
    <div style={{ height: '100vh' }}>
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
          borderColor: 'green',
          borderWidth: '10px',
        }}
      >
        {/* onChange for search */}
        <Form.Control
          onChange={e => setSearch(e.target.value)}
          placeholder="Search...."
        />
      </InputGroup>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Apartment No</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payment &&
              payment
                .filter(data => {
                  return search.toLowerCase() === ''
                    ? data
                    : keys.some(key => {
                        const value = String(data[key]);
                        return (
                          (value &&
                            value
                              .toLowerCase()
                              .includes(search.toLowerCase())) ||
                          false
                        );
                      });
                })
                .map(data => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{data.apartmentNo}</TableCell>
                    <TableCell align="center">{data.category}</TableCell>
                    <TableCell align="center">{data.amount}</TableCell>
                    <TableCell align="center">
                      {data.createAt}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewPayment;
