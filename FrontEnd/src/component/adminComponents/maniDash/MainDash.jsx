import React from 'react';
import {
  NavLink,
  Outlet,
} from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import clsx from 'clsx';

const useStyles = makeStyles()(theme => ({
  root: {
    // [theme.breakpoints.up('md')]: {
    //   width: '30%',
    // },
    // [theme.breakpoints.down('md')]: {
    //   width: '60%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   width: '95%',
    // },
    
    margin: '0 auto',
    height: '100vh',
    width: 'auto',
    paddingTop: '30px',
    paddingLeft: '60px',
  },
  content:{
    paddingTop:'20px',
   
  },
  nav: {
    '&:hover': {
      backgroundColor: '#ffffff',
      boxShadow: '10px 10px 5px lightblue'
    },

    fontSize: '18px',
    fontWeight: 'bold',
    textDecoration: 'none',
    
  },
  p1: {
    paddingLeft: '20px',
  },
  p2: {
    paddingLeft: '10px',
  },
}));

function MainDash() {
  const { classes } = useStyles();

  const navLinkStyle = ({ isActive }) => {
    return {
      frontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? 'green' : 'black',
    };
  };

  return (
    <div className={classes.root}>
      <h1>Admin Dashboard</h1>
      <div className={classes.content}>
        <NavLink
          to=""
          className={clsx(classes.nav, classes.p2)}
          style={navLinkStyle}
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="add"
          className={clsx(classes.nav, classes.p1)}
          style={navLinkStyle}
        >
          <span>Add Apartment</span>
        </NavLink>
        <NavLink
          to="view"
          className={clsx(classes.nav, classes.p1)}
          style={navLinkStyle}
        >
          <span>View Apartment</span>
        </NavLink>
        <NavLink
          to="maintenance"
          className={clsx(classes.nav, classes.p1)}
          style={navLinkStyle}
        >
          <span>Maintenance Cost</span>
        </NavLink>

        {/* <div><CalenderComp/></div> */}
        <Outlet />
      </div>
    </div>
  );
}

export default MainDash;
