import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function OutlinedCard(props) {
  const { apartmentCnt, income, apartment, title, title2, title3 } = props;

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ paddingLeft: '60px' }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          style={{ paddingLeft: '80px', textDecoration: 'bold' }}
        >
          {apartmentCnt}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const incomeCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ paddingLeft: '35px' }}
        >
          {title3}
        </Typography>

        <Typography variant="h6" style={{ paddingLeft: '80px' }}>
          {apartment}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  const availableCard = (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          style={{ paddingLeft: '40px' }}
        >
          {title2}
        </Typography>

        <Typography variant="h6" style={{ paddingLeft: '60px' }}>
          {income}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: '120%', display: 'flex', columnGap: '7%', justifyContent:'space-between'  }}>
      <Card
        variant="outlined"
        style={{ backgroundColor: 'grey', display: 'flex', width: '25%' }}
      >
        {card}
      </Card>
      <Card
        variant="outlined"
        style={{ backgroundColor: 'pink', display: 'flex', width: '25%' }}
      >
        {incomeCard}
      </Card>
      <Card
        variant="outlined"
        style={{ backgroundColor: 'white', display: 'flex', width: '25%' }}
      >
        {availableCard}
      </Card>
    </Box>
  );
}
