import './App.css';
import MainDash from './component/adminComponents/maniDash/MainDash';
import {Route, Routes } from 'react-router-dom';
import Navbar from './component/adminComponents/maniDash/Navbar';
import HomeNavBar from './component/adminComponents/maniDash/HomeNavBar';
import ManagerNavBar from './component/adminComponents/maniDash/ManagerNavBar';
import Cards from './component/adminComponents/cards/Cards';
import ManagerCard from './component/managerComponents/managerCard';
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
import CustomerReport from './component/userComponent/component/CustomerReport'
import ViewPayment from './component/userComponent/component/ViewPayment'

import RepoDash from './component/adminComponents/maniDash/RepoDash';
import ManagerRepoDash from './component/adminComponents/maniDash/ManagerRepoDash';
import ManagerDashboard from './component/managerComponents/managerDashboard';
import ServiceReport from './component/managerComponents/serviceReport';
import ServiceProvider from './component/managerComponents/serviceProvider';
import MaintenanceRepo from './component/adminComponents/navPages/MaintenanceRepo';
import AddEmployees from './component/Employee_Components/navPages/AddEmployee';
import ViewEmployee from './component/Employee_Components/navPages/ViewEmployee';
import Amenity from './component/userComponent/amenitiesComponent/amenity';
import AmenityReport from './component/adminComponents/Amenity/report/Amenityreport';
import GuestNavBar from'./component/adminComponents/maniDash/searchBar/GuestNavBar'

import Form from './component/adminComponents/navPages/Form'



// import Add_Complain from './component/adminComponents/Complain/Components/client_comps/Add_Complain/Add_Complain';
import {
  SuperAdminAuthGuard,
  AdminAuthGuard,
  AuthGuard,
  GuestGuard,
} from './component/AuthGuard';
import VisitorHomePage from './component/userComponent/component/VisitorHomePage';

//complain - imports start

 //complain - imports start

 //test
// import Compage_Home from './component/adminComponents/Complains/Pages/Admin_complain_pg';
// //import Compage_Home from './component/adminComponents/Complains/Pages/client_complain_pg'; // client home
// import All_complain from './component/adminComponents/Complains/Pages/Admin_complain_pg';
// import Report_complain from './component/adminComponents/Complains/Components/admin_comps/report/Report';
// import Compage_client_update from './component/adminComponents/Complains/Components/client_comps/Update_Complain/Update_Complain';
// import Compage_client_new from './component/adminComponents/Complains/Components/client_comps/Add_Complain/Add_Complain';

//---admin
//import Compage_Home from "./component/adminComponents/Complain/Pages/Complain_navigation"
//import Single_complain from "./component/adminComponents/Complain/Components/admin_comps/single/Single_complain"
//import All_complain from "./component/adminComponents/Complain/Components/admin_comps/view_complain/View_complain"
//import Report_complain from "./component/adminComponents/Complain/Components/admin_comps/report/Report"
// import Compage_Home from "./component/adminComponents/Complain/Pages/Complain_navigation"
// import Single_complain from "./component/adminComponents/Complain/Components/admin_comps/single/Single_complain"
// import All_complain from "./component/adminComponents/Complain/Components/admin_comps/view_complain/View_complain"
import Report_complain from "./component/adminComponents/Complain/Components/admin_comps/report/Report"



//import Compage_client_update from "./component/adminComponents/Complain/Pages/Client_Complain"
//import Compage_client_new from './component/adminComponents/Complain/Components/client_comps/Add_Complain/Add_Complain';
 import HomeBar from './component/userComponent/component/HomeBar';
import EditApartments from './component/adminComponents/navPages/EditApartments';
import EmployeeReport from './component/Employee_Components/navPages/Employee_report';


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
          {/* <Route path="Comlpain/:id" element={<Single_complain />} />
          <Route path="Comlpain/all" element={<All_complain />} /> */}
        </Route>
        <Route path="repo" element={<RepoDash />}>
          <Route path="" element={<MaintenanceRepo />} />
          <Route path="amenity" element={<AmenityReport/>} />
          <Route path="Comlpain/reprot" element={<Form />} />
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
          <Route path="" element={<ManagerCard />} />
          <Route path="Employee_add" element={<AddEmployees />} />
          <Route path="Employee_view" element={<ViewEmployee />} />
          <Route path="staff" element={<Cards />} />
          <Route path="serviceProvider" element={<ServiceProvider />} />
          <Route path="notices" element={<Cards />} />
        </Route>
        <Route path="repo" element={<ManagerRepoDash />}>
          <Route path="serviceProvider" element = {<ServiceReport/>} />
          <Route path="employee" element = {<EmployeeReport/>} />
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
        <Route path="viewPayment" element={<ViewPayment/>} />
        {/* <Route path="Comlpain/new" element={<Compage_client_new />} />
        <Route path="Comlpain/update" element={<Compage_client_update />} /> */}
        <Route path="updateCustomer/:id" element={<UpdateCustomer />} />
        <Route path="amenities" element={<Amenity />} />
        <Route path="customerReport/:id" element={<CustomerReport/>} 
        />
      </Routes>
    </AuthGuard>
  );
}

function GuestRoutes() {
  return (
    <GuestGuard>
      <GuestNavBar/>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="recoveryPassword" element={<RecoveryPassword />} />
        <Route path="recoveryPasswordSet" element={<RecoveryPasswordSetPage />} />
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
        <Route path="amenity" element={<AddApartments />} />
      </Routes>
    </div>
  );
}

export default App;
