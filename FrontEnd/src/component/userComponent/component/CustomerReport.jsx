import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, Box, Button } from '@material-ui/core';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut , Chart } from 'react-chartjs-2';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
          '#633EBB',
          '#BE61CA',
          '#F2BC5E',
          '#F13C59',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
 
        ],
        borderWidth: 1,
      },
    ],
  };

  const saveAsPDF = () => {
    const chartContainer = document.getElementById('chart-container');

    html2canvas(chartContainer).then( (canvas) => {

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: '1', unit: 'px', format: [canvas.width, canvas.height]});
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0,0,width, height);
      pdf.save('chart.pdf');

    });
  }

  return (
    <div>
      <Box
      id='chart-container'
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
      
      </Box>
      <Button onClick={saveAsPDF} style={{
            backgroundColor:'#006ee6',
            
          }}>
        Download PDF
      </Button>
    </div>
  );
}
