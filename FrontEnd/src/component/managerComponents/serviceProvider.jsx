// Library imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// Custom imports
import ServiceCard from './ServiceCard';
import './serviceProvider.css';
import AddService from './AddService';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: '2px solid black',
  borderRadius: '5px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '50%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Service Provider Main component
const ServiceProvider = () => {
  const [showForm, setShowForm] = React.useState(false);

  const [defaultServiceProviders, setdefaultServiceProviders] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isService, setIsService] = useState(false);

  const displayFormHandler = () => {
    setShowForm(true);
  };

  const submitFormHandler = () => {
    setShowForm(false);
  };

  const requestSearch = (searchedVal) => {
    
    const searchValue = searchedVal.target.value;

    const filteredRows = defaultServiceProviders.filter((serviceProvider) => {
      return serviceProvider.location.toLowerCase().includes(searchValue.toLowerCase()) || serviceProvider.serviceType.toLowerCase().includes(searchValue.toLowerCase())
    });
    setServiceProviders(filteredRows);
  };

  // useEffect is used to make sure once service provider is added the service provider is displayed instantly on the service provider dashboard
  useEffect(() => {
    const fetchServiceProviderDetails = async () => {
      const response = await fetch('/service-provider/');
      const json = await response.json();

      if (response.ok) {
        setdefaultServiceProviders(json);
        setServiceProviders(json);
        setIsService(false);
      }
    };

    fetchServiceProviderDetails();
  }, [isService]);

  //JSX Components start here
  return (
    <React.Fragment>
      <div className="serviceProviderContainer">
        <Grid container justifyContent = {'space-between'} style = {{marginBottom: '4%'}}>
          <Grid item xs={3}>
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(searchVal) => {requestSearch(searchVal)}}
              />
            </Search>
          </Grid>
          <Grid item xs={7}>
            <div>
              <Button
                variant="contained"
                onClick={displayFormHandler}
                style={{
                  backgroundColor: '#488042',
                  padding: '2%'
                }}
              >
                Add Service Provider
              </Button>
            </div>
          </Grid>
        </Grid>

        <div className="serviceProviderList">
          <Grid container spacing={12}>
            {serviceProviders.map(serviceProvider => (
              <Grid item xs={4} key={serviceProvider._id}>
                <ServiceCard
                  id={serviceProvider._id}
                  cName={serviceProvider.companyName}
                  sType={serviceProvider.serviceType}
                  location={serviceProvider.location}
                  cNumber={serviceProvider.contactNumber}
                  spList={serviceProviders}
                  setServiceProviders={setServiceProviders}
                  setIsService={setIsService}
                  image={serviceProvider.photo}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <AddService
          showForm={showForm}
          submitFormHandler={submitFormHandler}
          setShowForm={setShowForm}
          setIsService={setIsService}
        />
      </div>
    </React.Fragment>
  );
};

export default ServiceProvider;
