// Library imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// Custom imports
import ServiceCard from './ServiceCard';
import './serviceProvider.css';
import AddService from './AddService';

// Service Provider Main component
const ServiceProvider = () => {
  const [showForm, setShowForm] = React.useState(false);
  
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isService, setIsService] = useState(false);

  const displayFormHandler = () => {
    setShowForm(true);
  };

  const submitFormHandler = () => {
    setShowForm(false);
  };

  // useEffect is used to make sure once service provider is added the service provider is displayed instantly on the service provider dashboard
  useEffect(() => {
    const fetchServiceProviderDetails = async () => {
      const response = await fetch('/service-provider/');
      const json = await response.json();

      if (response.ok) {
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
        <div>
          <Button
            variant="contained"
            onClick={displayFormHandler}
            style={{
              backgroundColor: '#488042',
              marginLeft: '82%',
              marginTop: '2%',
            }}
          >
            Add Service Provider
          </Button>
        </div>

        <div className="serviceProviderList">
          <Grid container spacing={12}>
            {serviceProviders.map((serviceProvider) => (
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
                  image = {serviceProvider.photo}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <AddService showForm = {showForm} submitFormHandler = {submitFormHandler} setShowForm = {setShowForm} setIsService = {setIsService}/>
      </div>
    </React.Fragment>
  );
};

export default ServiceProvider;
