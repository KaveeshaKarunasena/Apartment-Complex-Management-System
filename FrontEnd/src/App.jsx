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
import HomeBar from './component/userComponent/component/HomeBar';

import RepoDash from './component/adminComponents/maniDash/RepoDash';
import ManagerDashboard from './component/managerComponents/managerDashboard';
import ServiceProvider from './component/managerComponents/serviceProvider';
import MaintenanceRepo from './component/adminComponents/navPages/MaintenanceRepo';
import AddEmployees from './component/Employee_Components/navPages/AddEmployee';
import EditEmployee from './component/Employee_Components/navPages/EditEmployee';
import ViewEmployee from './component/Employee_Components/navPages/ViewEmployee';
import Amenity from './component/userComponent/amenitiesComponent/amenity'



import Add_Complain from './component/adminComponents/Complain/Components/client_comps/Add_Complain/Add_Complain';
import {
  SuperAdminAuthGuard,
  AdminAuthGuard,
  AuthGuard,
  GuestGuard,
} from './component/AuthGuard';
import VisitorHomePage from './component/userComponent/component/VisitorHomePage';


 //complain - imports start

 //test
// import Compage_Home from './component/adminComponents/Complains/Pages/Admin_complain_pg';
// //import Compage_Home from './component/adminComponents/Complains/Pages/client_complain_pg'; // client home
// import All_complain from './component/adminComponents/Complains/Pages/Admin_complain_pg';
// import Report_complain from './component/adminComponents/Complains/Components/admin_comps/report/Report';
// import Compage_client_update from './component/adminComponents/Complains/Components/client_comps/Update_Complain/Update_Complain';
// import Compage_client_new from './component/adminComponents/Complains/Components/client_comps/Add_Complain/Add_Complain';

//---admin
import Compage_Home from "./component/adminComponents/Complain/Pages/Home"
import Single_complain from "./component/adminComponents/Complain/Components/admin_comps/single/Single_complain"
import All_complain from "./component/adminComponents/Complain/Components/admin_comps/view_complain/View_complain"
import Report_complain from "./component/adminComponents/Complain/Components/admin_comps/report/Report"


//---client
import Compage_client_update from "./component/adminComponents/Complain/Pages/client-pg/Complain_Pg/Complain"
import Compage_client_new from "./component/adminComponents/Complain/Components/client_comps/Add_Complain/Add_Complain"

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
      <Routes>
        <Route path="" element={<MainDash />}>
          <Route path="" element={<Cards />} />
          <Route path="add" element={<AddApartments />} />
          <Route path="view" element={<ViewApartments />} />
          <Route path="maintenance" element={<Maintenance />} />
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
  return (
    <AdminAuthGuard>
      <Routes>
        <Route path="" element={<ManagerDashboard />}>
          <Route path="" element={<Cards />} />
          <Route path="Employee_add" element={<AddEmployees />} />
          <Route path="Employee_view" element={<ViewEmployee />} />
          <Route path="staff" element={<Cards />} />
          <Route path="serviceProvider" element={<ServiceProvider />} />
          <Route path="notices" element={<Cards />} />
        </Route>
      </Routes>
    </AdminAuthGuard>
  );
}

function ProtectedRoutes() {
  return (
    <AuthGuard>
      <HomeBar/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="amenities" element={<Amenity />} />
      </Routes>
    </AuthGuard>
  );
}

function GuestRoutes() {
  return (
    <GuestGuard>
      <Routes>
        {/* //Complain Routes Start */}
        <Route path="Comlpain" element={<Compage_Home />} />
        <Route path="Comlpain/:id" element={<Single_complain />} />
        <Route path="Complain/new" element={<Compage_client_new />} />
        <Route path="Comlpain/update" element={<Compage_client_update />} />
        <Route path="Comlpain/reprot" element={<Report_complain />} />
        <Route path="Comlpain/all" element={<All_complain />} />
         {/* //Complain Routes End */}




        <Route path="login" element={<SignIn />} />
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
      <Navbar />
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
