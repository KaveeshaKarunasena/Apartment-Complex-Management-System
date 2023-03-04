

import MainDash from './component/adminComponents/maniDash/MainDash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './component/adminComponents/pages/About';
import Analytics from './component/adminComponents/pages/Analytics';
import Comment from './component/adminComponents/pages/Comment';
import Dashboard from './component/adminComponents/pages/Dashboard';
import Product from './component/adminComponents/pages/Product';
import ProductList from './component/adminComponents/pages/ProductList';
import Navbar from './component/adminComponents/maniDash/Navbar';
import Cards from './component/adminComponents/cards/Cards';
import AddApartments from './component/adminComponents/navPages/AddApartments';
import RightSide from './component/adminComponents/rightSide/RightSide';
import CalenderComp from './component/adminComponents/rightSide/CalenderComp';
import Maintenance from './component/adminComponents/navPages/Maintenance';
import ViewApartments from './component/adminComponents/navPages/ViewApartments';
import EditApartmets from './component/adminComponents/navPages/EditApartments';
import { useState } from 'react';
import { setRef } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from 'tss-react/mui';


const useStyles = makeStyles()(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    // margin: '0 auto'

    height: '100vh',
    width: '100%',
    display: 'flex',
    marginTop: '30px',
  },
}));

function App() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
    <SnackbarProvider>
      <BrowserRouter>
        <div >
            <Navbar />
              <Routes>
                <Route path="/" element={<MainDash />}>
                  <Route path="/" element={<Cards />} />
                  <Route path="add" element={<AddApartments />} />
                  <Route path="view" element={<ViewApartments />} />
                  <Route path="maintenance" element={<Maintenance />} />
                </Route>
              </Routes>
            </div>
      </BrowserRouter>
    </SnackbarProvider>
    </div>
  );
}

export default App;
