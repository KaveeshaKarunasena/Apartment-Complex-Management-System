import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../adminComponents/cards/Cards.css';
import CalenderComp from '../adminComponents/rightSide/CalenderComp';
import { Promise } from 'mongoose';

function Cards() {
  const [nEmp, setNEmp] = useState(0);
  const [nSp, setNSp] = useState(0);
  const [commission, setCommission] = useState(0);
  const [salaryPaid, setSalaryPaid] = useState(0);

  useEffect(() => {

    let getManagerStatistics = async () => {
        const { data } = await axios.get(
          '/service-provider/getManagerStatistics'
        );
  
      
          setNSp(data.spCount);
          setCommission(data.commissionGained);
  
       
      };

    let getEmployeeStatistics = async () => {
      const { data } = await axios.get(
        '/service-provider/getEmployeeStatistics'
      );

        setNEmp(data.employeeCount);
        setSalaryPaid(data.salaryPaid);

     
    };

    getEmployeeStatistics();
    getManagerStatistics();
  }, []);

  return (
    <div className="Cards" style={{ marginBottom: '5%' }}>
      <Grid container style={{ width: '75%', marginTop: '2%' }} spacing={2}>
        <Grid item xs={5}>
          <Card
            sx={{ width: 400, height: 200 }}
            style={{
              backgroundImage: `url('http://localhost:5000/uploads/back2.jpg')`,
            }}
          >
            <CardContent style={{ padding: '10%' }}>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', fontWeight: '6%' }}
              >
                Number of Employees
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: '6%',
                  padding: '5%',
                }}
              >
                {nEmp}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            sx={{ width: 400, height: 200 }}
            style={{
              backgroundImage: `url('http://localhost:5000/uploads/back.jpg')`,
            }}
          >
            <CardContent style={{ padding: '10%' }}>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', fontWeight: '6%' }}
              >
                Number of Service Providers
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: '6%',
                  padding: '5%',
                }}
              >
                {nSp}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            sx={{ width: 400, height: 200 }}
            style={{
              backgroundImage: `url('http://localhost:5000/uploads/back.jpg')`,
            }}
          >
            <CardContent style={{ padding: '10%' }}>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', fontWeight: '6%' }}
              >
                Total Salary to be paid
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: '6%',
                  padding: '5%',
                }}
              >
                ${salaryPaid}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            sx={{ width: 400, height: 200 }}
            style={{
              backgroundImage: `url('http://localhost:5000/uploads/back2.jpg')`,
            }}
          >
            <CardContent style={{ padding: '10%' }}>
              <Typography
                sx={{ fontSize: 24, textAlign: 'center', fontWeight: '6%' }}
              >
                Total Commission Gained
              </Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  textAlign: 'center',
                  fontWeight: '6%',
                  padding: '5%',
                }}
              >
                ${commission}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CalenderComp style={{ maxWidth: 800 }}></CalenderComp>
    </div>
  );
}

export default Cards;
