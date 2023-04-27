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

import { SuperAdminAuthGuard,AdminAuthGuard,AuthGuard, GuestGuard } from './component/AuthGuard'
import VisitorHomePage from './component/userComponent/component/VisitorHomePage';


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


function SupserAdminRoute() {
  return(

      <SuperAdminAuthGuard>
        <Routes>    
          <Route path="" element={<MainDash />}>
            <Route path="" element={<Cards />} />
            <Route path="add" element={<AddApartments />} />
            <Route path="view" element={<ViewApartments />} />
            <Route path="maintenance" element={<Maintenance />} />
            {/* <Route path="maintenanceRepo" element={<MaintenanceRepo />} />
            <Route path="amenity" element={<AddApartments />} />
            <Route path="complaint" element={<ViewApartments />} /> */}
          </Route>
          <Route path="repo" element={<RepoDash />}>
                  <Route path="" element={<MaintenanceRepo />} />
                  <Route path="amenity" element={<AddApartments />} />
                  <Route path="complaint" element={<ViewApartments />} />
                </Route>
        </Routes>  
      </SuperAdminAuthGuard>
  );
 

}

function AdminRoute() {
  return(

      <AdminAuthGuard>
        <Routes>  
          <Route path="" element={<ManagerDashboard />}>
            <Route path="" element={<Cards />} />
            <Route path="Employee_add" element={<AddEmployees/>} />
            <Route path="Employee_view" element={<ViewEmployee/>} />
            <Route path="staff" element={<Cards />} />
            <Route path="serviceProvider" element={<ServiceProvider />} />
            {/* <Route path="notices" element={<Cards />} />  */}
          </Route>
        </Routes>  
      </AdminAuthGuard>
  );
 

}

function ProtectedRoutes() {
  return(

      <AuthGuard>
        <Routes>  
            <Route path=""  element={<Home />}/>
            <Route path="profile"  element={<ProfilePage/>} />   
            <Route path="add" element={<AddApartments />} /> 
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
      
        
          <div>

            <Navbar />

{/*================================================Customer Routes========================================================*/}
             
            <Routes> 
               <Route path="app/*" element={<ProtectedRoutes />} />
               <Route path="admin/*" element={<SupserAdminRoute />} /> 
               <Route path="manager/*" element={<AdminRoute />} /> 
               <Route path="*" element={<GuestRoutes />} /> 
            </Routes> 

 {/*=======================================================================================================================*/}


{/* 
            <Routes>  */}
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
            </Routes> */} 


          </div>
      
      
    </div>
  );
}

export default App;
