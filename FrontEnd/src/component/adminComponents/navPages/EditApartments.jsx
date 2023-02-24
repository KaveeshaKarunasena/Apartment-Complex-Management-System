import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import {useState, useEffect} from 'react';

const useStyles = makeStyles()(theme => ({
  root: {
    // [theme.breakpoints.up('md')]: {
    //   width: '30%',
    // },
    // [theme.breakpoints.down('md')]: {
    //   width: '60%',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   width: '95%',
    // },
    margin: '0 auto',
    height: '75vh',
    width: '60vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
  },
  formControl: {
    marginTop: '10px',
  },
  submitBtn: {
    marginTop: '15px',
  },
}));

const EditApartments = (props)=>{

  const { classes } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  

  const [state , setState] = useState({
          apartmentno :'',
          floor : '',
          buildingNo :'',
          type :'',
          ownersName : '',
          status :'',
});
  

const onInputChange =(e) =>{

        setState ({...state,[e.target.name]:e.target.value});
    }
    
useEffect (() =>{

  const {id} = props;
  const getData = async () => {

   
    console.log(id);

    await axios.get(`/apartment/getById/${id}`)
    .then((res)=>{
        if(res.data.success){
        setState({

            apartmentno : res.data.apartmentModel.apartmentno,
            floor : res.data.apartmentModel.floor,
            buildingNo : res.data.apartmentModel.buildingNo,
            type : res.data.apartmentModel.type,
            status: res.data.apartmentModel.status,
            ownersName: res.data.apartmentModel.ownersName

        })
        
    }else
    console.log("Error ")

  })
  }
  
      getData();  
    },[])


const updateApartment = async(e) =>{
        e.preventDefault();
        const {apartmentno,floor,buildingNo,type,status,ownersName} = state;
        const {id} = props;

        console.log(id)
        const {setOpenPopup} = props;
        const data ={
            apartmentno : apartmentno,
            floor : floor,
            buildingNo : buildingNo,
            type : type,
            status: status,
            ownersName: ownersName,
        }
        
        console.log(data)

        setOpenPopup(false);
         try{

          await axios.put(`/apartment/update/${id}`,data)
          .then ((res)=> {
            enqueueSnackbar('Succesfully Updated', { variant: 'success' });
              if(res.data.success){
                  
                  setState({
                      apartmentno : "",
                      floor : "",
                      buildingNo : "",
                      type : "",
                      status: "",
                      ownersName: "",
                  })
                  
              }
         
         })
         } catch(err) {
          enqueueSnackbar(err, { variant: 'error' });
        }
            

        }


        return(
          <Box className={classes.root}>
          <Formik
           validationSchema={Yup.object().shape({
            apartmentno: Yup.string()
              .max(3, 'must have maximum 3 Numbers')
              .required('Required*'),
            floor: Yup.string()
              .max(2, 'must have maximum 2 Numbers')
              .required('Required'),
            buildingNo: Yup.string().required('Required'),
            type: Yup.string().required('Required'),
            ownersName: Yup.string().required('Required'),
            status: Yup.string().required('Required'),
          })}
          >
            {({  errors, }) => {
              return (
                <>
                  <Typography variant="h3">Edit Apartment</Typography>
                  <FormControl className={classes.formControl} variant="outlined">
                    <TextField
                      value={state.apartmentno}
                      onChange={onInputChange}
                      name="apartmentno"
                      label="Apartment No"
                      type="text"
                      size="small"
                      error={
                        errors.apartmentno && errors.apartmentno?.length
                          ? true
                          : false
                      }
                    />
                    <FormHelperText stylr={{ color: 'red' }}>
                      {errors.apartmentno}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl} variant="outlined">
                    <TextField
                      value={state.floor}
                      onChange={onInputChange}
                      name="floor"
                      label="Floor No"
                      type="text"
                      size="small"
                      error={errors.floor && errors.floor?.length ? true : false}
                    />
                    <FormHelperText stylr={{ color: 'red' }}>
                      {errors.floor}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl} variant="outlined">
                    <TextField
                      value={state.buildingNo}
                      onChange={onInputChange}
                      name="buildingNo"
                      label="Building No"
                      type="text"
                      size="small"
                      error={
                        errors.buildingNo && errors.buildingNo?.length
                          ? true
                          : false
                      }
                    />
                    <FormHelperText stylr={{ color: 'red' }}>
                      {errors.buildingNo}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl} variant="outlined">
                    <TextField
                      value={state.type}
                      onChange={onInputChange}
                      name="type"
                      label="Type"
                      type="text"
                      size="small"
                      error={errors.type && errors.type?.length ? true : false}
                    />
                    <FormHelperText stylr={{ color: 'red' }}>
                      {errors.type}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl} variant="outlined">
                    <TextField
                      value={state.ownersName}
                      onChange={onInputChange}
                      name="ownersName"
                      label="Owners Name"
                      type="text"
                      size="small"
                      error={
                        errors.ownersName && errors.ownersName?.length
                          ? true
                          : false
                      }
                    />
                    <FormHelperText stylr={{ color: 'red' }}>
                      {errors.ownersName}
                    </FormHelperText>
                  </FormControl>
                  <FormControl className={classes.formControl} variant="outlined">
                    <TextField
                      value={state.status}
                      onChange={onInputChange}
                      name="status"
                      label="Status"
                      type="text"
                      size="small"
                      error={errors.status && errors.status?.length ? true : false}
                    />
                    <FormHelperText stylr={{ color: 'red' }}>
                      {errors.status}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    onClick={updateApartment}
                    type="submit"
                    className={classes.submitBtn}
                    variant="contained"
                  >
                    Update
                  </Button>
                </>
              );
            }}
          </Formik>
        </Box>
        )
         
    }

export default EditApartments

