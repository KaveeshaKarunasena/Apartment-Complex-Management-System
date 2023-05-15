import './App.css';
import MainDash from './component/adminComponents/maniDash/MainDash';
import {Route, Routes } from 'react-router-dom';
import Navbar from './component/adminComponents/maniDash/Navbar';
import HomeNavBar from './component/adminComponents/maniDash/HomeNavBar';
import ManagerNavBar from './component/adminComponents/maniDash/ManagerNavBar';
import Cards from './component/adminComponents/cards/Cards';
import AddApartments from './component/adminComponents/navPages/AddApartments';
import Maintenance from './component/adminComponents/navPages/Maintenance';
import ViewApartments from './component/adminComponents/navPages/ViewApartments';
import { makeStyles } from 'tss-react/mui';

import SignUp from './component/userComponent/component/SignUp';
import SignIn from './component/userComponent/component/SignIn';
import ProfilePage from './component/userComponent/component/ProfilePage';
import Payment from './component/userComponent/component/Payment';
import Home from './component/userComponent/component/Home';
import UpdateCustomer from './component/userComponent/component/UpdateCustomer'
import RecoveryPassword from './component/userComponent/component/RecoveryPassword'
import RecoveryPasswordSetPage from './component/userComponent/component/RecoveryPasswordSetPage'

import RepoDash from './component/adminComponents/maniDash/RepoDash';
import ManagerRepoDash from './component/adminComponents/maniDash/ManagerRepoDash';
import ManagerDashboard from './component/managerComponents/managerDashboard';
import ServiceProvider from './component/managerComponents/serviceProvider';
import MaintenanceRepo from './component/adminComponents/navPages/MaintenanceRepo';
import AddEmployees from './component/Employee_Components/navPages/AddEmployee';
import ViewEmployee from './component/Employee_Components/navPages/ViewEmployee';
import {
  SuperAdminAuthGuard,
  AdminAuthGuard,
  AuthGuard,
  GuestGuard,
} from './component/AuthGuard';
import VisitorHomePage from './component/userComponent/component/VisitorHomePage';


import Single_complain from "./component/adminComponents/Complain/Components/admin_comps/single/Single_complain"
import All_complain from "./component/adminComponents/Complain/Components/admin_comps/view_complain/View_complain"
import Report_complain from "./component/adminComponents/Complain/Components/admin_comps/report/Report"


//---client
import Compage_client_update from "./component/adminComponents/Complain/Pages/Client_Complain"
import Compage_client_new from './component/adminComponents/Complain/Components/client_comps/Add_Complain/Add_Complain';
import HomeBar from './component/userComponent/component/HomeBar';

//complain - imports end


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
  return (
    <SuperAdminAuthGuard>
      <Navbar />
      <Routes>
        <Route path="" element={<MainDash />}>
          <Route path="" element={<Cards />} />
          <Route path="add" element={<AddApartments />} />
          <Route path="view" element={<ViewApartments />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="Comlpain/:id" element={<Single_complain />} />
          <Route path="Comlpain/all" element={<All_complain />} />
        </Route>
        <Route path="repo" element={<RepoDash />}>
          <Route path="" element={<MaintenanceRepo />} />
          <Route path="amenity" element={<AddApartments />} />
          <Route path="Comlpain/reprot" element={<Report_complain />} />
        </Route>
      </Routes>
    </SuperAdminAuthGuard>
  );
}

function AdminRoute() {
  return (
    <AdminAuthGuard>
      <ManagerNavBar />
      <Routes>
        <Route path="" element={<ManagerDashboard />}>
          <Route path="" element={<Cards />} />
          <Route path="Employee_add" element={<AddEmployees />} />
          <Route path="Employee_view" element={<ViewEmployee />} />
          <Route path="staff" element={<Cards />} />
          <Route path="serviceProvider" element={<ServiceProvider />} />
          <Route path="notices" element={<Cards />} /> 
        </Route>
        <Route path="repo" element={<ManagerRepoDash />}>
        </Route>

      </Routes>
    </AdminAuthGuard>
  );
}

function ProtectedRoutes() {
  return (
    <AuthGuard>
      <HomeNavBar />
      <HomeBar/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="payment" element={<Payment/>}/>
        <Route path="Comlpain/new" element={<Compage_client_new />} />
        <Route path="Comlpain/update" element={<Compage_client_update />} />
        <Route path="updateCustomer/:id" element={<UpdateCustomer />} />
      </Routes>
    </AuthGuard>
  );
}

function GuestRoutes() {
  return (
    <GuestGuard>
      <Navbar />
      <Routes>
        <Route path="login" element={<SignIn />} />
        {/* /<Route path="recoveryPassword" element={<RecoveryPassword />} />
        <Route path="recoveryPasswordSet/:email" element={<RecoveryPasswordSetPage />} /> */}
        <Route path="signup" element={<SignUp />} />
        <Route path="/" exact element={<VisitorHomePage />} />
      </Routes>
    </GuestGuard>
  );
}

function App() {
  const { classes } = useStyles();

  return (
    <div className="App">
  
      <Routes>
        <Route path="app/*" element={<ProtectedRoutes />} />
        <Route path="admin/*" element={<SupserAdminRoute />} />
        <Route path="manager/*" element={<AdminRoute />} />
        <Route path="*" element={<GuestRoutes />} />
      </Routes>

    </div>
  );
}

export default App;