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

import SignUp from './component/userComponent/component/SignUp';
import SignIn from './component/userComponent/component/SignIn';
import ProfilePage from './component/userComponent/component/ProfilePage';
import Home from './component/userComponent/component/Home';

import RepoDash from './component/adminComponents/maniDash/RepoDash';
import ManagerDashboard from './component/managerComponents/managerDashboard'
import ServiceProvider from './component/managerComponents/serviceProvider';
import MaintenanceRepo from './component/adminComponents/navPages/MaintenanceRepo';
import AddEmployees from './component/Employee_Components/navPages/AddEmployee';
import EditEmployee from './component/Employee_Components/navPages/EditEmployee';
import ViewEmployee from './component/Employee_Components/navPages/ViewEmployee';

import { AuthGuard, GuestGuard } from './component/AuthGuard'
import VisitorHomePage from './component/userComponent/VisitorHomePage';
import Products from './component/userComponent/component/mainpages/products/Products';

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

function ProtectedRoutes() {
  return(
      <AuthGuard>
        <Routes> 
                <Route path="profile" element={<ProfilePage/>} />
                <Route path="customerhome" element={<Home />} />
        </Routes>  
      </AuthGuard>
  );
 

}

function GuestRoutes() {
  return (
    <GuestGuard>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" exact element={<VisitorHomePage />} />
      </Routes>
    </GuestGuard>
  );
}

function App() {
  // eslint-disable-next-line no-unused-vars
  const { classes } = useStyles();

  return (
    <div className="App">
      <SnackbarProvider>
        <BrowserRouter>
          <div>

            {/* <Routes>
               <Route path="login" element={<SignIn/>} />
               <Route path="signup" element={<SignUp/>} />
            </Routes> */}
            <Navbar />

{/*================================================Customer Routes========================================================*/}
             
            <Routes> 
              {/* <Route path="/home" element={<Home/>}> 
                <Route path="profile" element={<ProfilePage/>} />
              </Route>   */}
               <Route path="app/*" element={<ProtectedRoutes />} />
               <Route path="*" element={<GuestRoutes />} />
              
            </Routes>

 {/*=======================================================================================================================*/}

{/* 
            <Routes>  */}
              {/* <Route path="/home" element={<Home/>}> 
                <Route path="profile" element={<ProfilePage/>} />
              </Route>   */}

            <Routes>
              <Route path="/amaenity" element={<Products />}>
                <Route path="home" element={<Cards />} />
                {/* <Route path="add" element={<AddApartments />} />
                <Route path="view" element={<ViewApartments />} />
                <Route path="maintenance" element={<Maintenance />} /> */}
              </Route>
            </Routes>
               
         
            <Routes>
              <Route path="/main" element={<MainDash />}>
                <Route path="home" element={<Cards />} />
                <Route path="add" element={<AddApartments />} />
                <Route path="view" element={<ViewApartments />} />
                <Route path="maintenance" element={<Maintenance />} />
              </Route>
            </Routes>
           <Routes>
                <Route path="/repo" element={<RepoDash />}>
                  <Route path="maintenanceRepo" element={<MaintenanceRepo />} />
                  <Route path="amenity" element={<AddApartments />} />
                  <Route path="complaint" element={<ViewApartments />} />
                </Route>
              </Routes>
            {/* <Routes> */}
              {/* Manager Dashboard Routes */}
              {/* <Route path="/mDash" element={<ManagerDashboard />}>
                <Route path="home" element={<Cards />} />
                <Route path="Employee_add" element={<AddEmployees/>}></Route>
                <Route path="Employee_view" element={<ViewEmployee/>}></Route>
                <Route path="Employee_Update" element={<EditEmployee/>}></Route>
                <Route path="staff" element={<Cards />} />
                <Route path="serviceProvider" element={<ServiceProvider />} />
                
                {/* <Route path="notices" element={<Cards />} /> */}
              {/* </Route> 
            </Routes>  */}

          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
