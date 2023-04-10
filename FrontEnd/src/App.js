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
import ManagerDashboard from './component/managerComponents/managerDashboard'
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

function App() {
  const { classes } = useStyles();

  return (
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
  );
}

export default App;
