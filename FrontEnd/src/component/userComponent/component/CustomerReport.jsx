import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Box, Button } from '@material-ui/core';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut , Chart } from 'react-chartjs-2';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { colors } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  section: {
    textAlign:'center',
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});



export default function CustomerReport(props) {
  let authPayload = useContext(AuthContext);
  const decoded = jwt_decode(authPayload.token);
  const classes = useStyles();
  const apartmentNo = decoded.apartmentNo;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [amenityAmount, setAmenityAmount] = useState(0);
  const [billAmount, setBillAmount] = useState(0);
  const [serviceAmount, setServiceAmount] = useState(0);
  const [otherAmount, setOtherAmount] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`/addPayment/getPayment/${apartmentNo}`);
        const data = response.data;
        let amenityAmount = 0;
        let billAmount = 0;
        let serviceAmount = 0;
        let otherAmount = 0;

        data.forEach(payment => {
          if (payment.category === 'Amenity Chargers') {
            amenityAmount += payment.amount;
          } else if (payment.category === 'Bill Chargers') {
            billAmount += payment.amount;
          } else if (payment.category === 'Services Chargers') {
            serviceAmount += payment.amount;
          } else {
            otherAmount += payment.amount;
          }
        });

        setAmenityAmount(amenityAmount);
        setBillAmount(billAmount);
        setServiceAmount(serviceAmount);
        setOtherAmount(otherAmount);
        setData(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    const amenity = parseInt(amenityAmount, 10);
    const bill = parseInt(billAmount, 10);
    const service = parseInt(serviceAmount, 10);
    const other = parseInt(otherAmount, 10);
    const sum = amenity + bill + service + other;
    setCount(sum);
  }, [amenityAmount, billAmount, serviceAmount, otherAmount]);

  const chart = {
    labels: ['Amenity', 'Bill', 'Services', 'Other'],
    datasets: [
      {
        label: '# Chargers',
        data: [amenityAmount, billAmount, serviceAmount, otherAmount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const PdfDocument = ({ amenityAmount, billAmount, serviceAmount, otherAmount, chart }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Customer Report</Text>
          <Text>Amenity: Total - {amenityAmount}</Text>
          <Text>Bill: Total - {billAmount}</Text>
          <Text>Service: Total - {serviceAmount}</Text>
          <Text>Other: Total - {otherAmount}</Text>
          <Text>Total of Payments: {amenityAmount + billAmount + serviceAmount + otherAmount}</Text>
        </View>
        <View style={{
            width: '30%',
            height: '30%',
            paddingLeft: '33%',
            marginTop: '5%',}
          }>
          <Chart data={chart} type="doughnut" />
        </View>
      </Page>
    </Document>
  );

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        style={{ paddingLeft: '40%', marginTop: '5%' }}
      >
        Customer Report
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={2} style={{ marginTop: '2%' }}>
          <Grid item xs={4} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Amenity
                </Typography>
                <Typography color="textSecondary">
                  Total: {amenityAmount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Bill
                </Typography>
                <Typography color="textSecondary">
                  Total: {billAmount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
            className={classes.cardContainer}
            alignItems="center"
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Service
                </Typography>
                <Typography color="textSecondary">
                  Total: {serviceAmount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
            className={classes.cardContainer}
            alignItems="center"
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Other
                </Typography>
                <Typography color="textSecondary">
                  Total: {otherAmount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4} className={classes.cardContainer}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Total Of Payments
                </Typography>
                <Typography color="textSecondary">Total: {count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          width: '30%',
          height: '30%',
          paddingLeft: '33%',
          marginTop: '5%',
        }}
      >
        <Doughnut data={chart} />
      </div>
      <Button variant="contained" color="primary" style={{ color: 'white' }}>
      <PDFDownloadLink
        document={
          <PdfDocument
            amenityAmount={amenityAmount}
            billAmount={billAmount}
            serviceAmount={serviceAmount}
            otherAmount={otherAmount}
            chart={chart}
          />
        }
        fileName="customer_report.pdf"
        style={{
          textDecoration: 'none',
          color: 'white',
        }}
      >
        {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
      </PDFDownloadLink>
    </Button>
    </Box>
  );
}
