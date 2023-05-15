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
    content: {
      paddingTop: '40px',
    },
    nav: {
      '&:hover': {
        textDecoration: 'underline green',
        textDecorationSkipInk: 'none',
        textDecorationThickness: '0.2em',
        textUnderlineOffset: '0.4em',
        borderRadius: '50px',
      },
  
      fontSize: '18px',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: 'black',
      textAlign: 'center',
      marginRight: '2%',
      transistion: 'all 0.2s ease-in-out',
    }
  }));

function RepoDash() {
  
  const { classes } = useStyles();

  const navLinkStyle = ({ isActive }) => {
    return {
      frontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? 'green' : 'black',
    };
  };

  return (
    <div className={classes.root}>
      <h1>Manager Reports</h1>
      <div className={classes.content}>
        <NavLink
          to=""
          className={clsx(classes.nav)}
          style={navLinkStyle}
        >
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="serviceProvider"
          className={clsx(classes.nav)}
          style={navLinkStyle}
        >
          <span>Service Providers</span>
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
  
}

export default RepoDash;
