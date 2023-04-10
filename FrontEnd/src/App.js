<<<<<<< Updated upstream
import Sidebar from "./component/adminComponents/Sidebar";
import "./App.css";
import MainDash from "./component/adminComponents/maniDash/MainDash";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./component/adminComponents/pages/About";
import Analytics from "./component/adminComponents/pages/Analytics";
import Comment from "./component/adminComponents/pages/Comment";
import Dashboard from "./component/adminComponents/pages/Dashboard";
import Product from "./component/adminComponents/pages/Product";
import ProductList from "./component/adminComponents/pages/ProductList";
import Navbar from "./component/adminComponents/maniDash/Navbar";
import Cards from "./component/adminComponents/cards/Cards";
import AddApartments from "./component/adminComponents/navPages/AddApartments";
import RightSide from "./component/adminComponents/rightSide/RightSide";
import CalenderComp from "./component/adminComponents/rightSide/CalenderComp";
import Maintenance from "./component/adminComponents/navPages/Maintenance";
import ViewApartments from "./component/adminComponents/navPages/ViewApartments";
import EditApartmets from "./component/adminComponents/navPages/EditApartments";
import { useState } from "react";
import { setRef } from "@material-ui/core";
import { SnackbarProvider } from 'notistack';
=======
import './App.css';
import MainDash from './component/adminComponents/maniDash/MainDash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './component/adminComponents/maniDash/Navbar';
import Cards from './component/adminComponents/cards/Cards';
import AddApartments from './component/adminComponents/navPages/AddApartments';
import Maintenance from './component/adminComponents/navPages/Maintenance';
import ViewApartments from './component/adminComponents/navPages/ViewApartments';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from 'tss-react/mui';
import RepoDash from './component/adminComponents/maniDash/RepoDash';
import ManagerDashboard from './component/managerComponents/managerDashboard';
import ServiceProvider from './component/managerComponents/serviceProvider';

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
    margin: '0 0',

    height: '100vh',
    width: '100vh',
    display: 'flex',
    marginTop: '30px',
  },
}));
>>>>>>> Stashed changes

function App() {
  const [fix, setFix] = useState(false);

  const setFixedSidebar = () => {
    if (window.scrollY >= 50) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("srcoll", setFixedSidebar);

  return (
<<<<<<< Updated upstream
    <SnackbarProvider>
    <BrowserRouter>
      <div className="App">
        <div className="AppGlass">
          <div>
            <Sidebar className={fix ? "sidebar fixed" : "sidebar"}>
              <Routes>
                <Route path="/" element={<MainDash />}>
                  <Route path="/" element={<Cards />} />
                  <Route path="add" element={<AddApartments />} />
                  <Route path="view" element={<ViewApartments />} />
                  <Route path="edit/:id" element={<EditApartmets />} />
                  <Route path="maintenance" element={<Maintenance />} />
                </Route>

                {/* <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/about" element={<About />} />
             <Route path="/comment" element={<Comment />} />
             <Route path="/analytics" element={<Analytics />} />
             <Route path="/product" element={<Product />} />
             <Route path="/productList" element={<ProductList />} /> */}
              </Routes>
            </Sidebar>
          </div>

          <Navbar />
        </div>
      </div>
    </BrowserRouter>
    </SnackbarProvider>
=======
    <div className="App">
      <SnackbarProvider>
        <BrowserRouter>
          <div>
            <Navbar />
            <Routes>
              <Route path="/app" element={<MainDash />}>
                <Route path="home" element={<Cards />} />
                <Route path="add" element={<AddApartments />} />
                <Route path="view" element={<ViewApartments />} />
                <Route path="maintenance" element={<Maintenance />} />
              </Route>
            </Routes>
            <Routes>
              <Route path="/repo" element={<RepoDash />}>
                <Route path="maintenance" element={<Cards />} />
                <Route path="amenity" element={<AddApartments />} />
                <Route path="complaint" element={<ViewApartments />} />
              </Route>
            </Routes>
            <Routes>

              {/* Manager Dashboard Routes */}
              <Route path="/mDash" element={<ManagerDashboard />}>
                <Route path="home" element={<Cards />} />
                <Route path="staff" element={<Cards />} />
                <Route path="serviceProvider" element={<ServiceProvider />} />
                {/* <Route path="notices" element={<Cards />} /> */}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
>>>>>>> Stashed changes
  );
}

export default App;
