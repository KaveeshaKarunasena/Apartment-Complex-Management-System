import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import moment from 'moment';
import { saveAs } from 'file-saver';
import {
  Button,
} from '@mui/material';
import Controls from "../controls/Controls"
// var tableExport = require('table-export');
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CostTable = (props) => {

  const {startDate,endDate,comand} = props
  const [allData, setAllData] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [apartmentCost, setApartmentCost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/maintenance/costDetails');
      setApartmentCost(data.details);
      setAllData(data.details)
      console.log('table', data);
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, apartmentCost.length - page * rowsPerPage);

    const saveCanvas = ()  => {
      const chartContainer = document.getElementById('table');

  html2canvas(chartContainer).then( (canvas) => {

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: '1', unit: 'px', format: [canvas.width, canvas.height]});
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0,0,width, height);
    pdf.save('Table.pdf');

  });
  }

  const handleSubmit = () =>{
    console.log("filter",allData)
    
    let filtered = allData.filter((allData)=>{

      // let date2 = moment(allData.date).format('YYYY-MM-DD')
      let Chdate = new Date(allData.date)
      //  console.log(Chdate)
       if(Chdate >= startDate && Chdate <= endDate){
         const filterData = Chdate
         console.log(filterData)
         
          return filterData
         
       }
       
    })
    
    
    console.log(filtered)
    setApartmentCost(filtered)


}
  

  return (
    <div>
      <TableContainer  component={Paper}>
        <Table id = "table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Apartment No</TableCell>
              <TableCell align="center">Type&nbsp;</TableCell>
              <TableCell align="center">Owners Name&nbsp;</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Total&nbsp;</TableCell>
              <TableCell align="center">Date&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartmentCost &&
              apartmentCost
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(data => (
                  <TableRow key={data._id}>
                    <TableCell align="center">{data._id}</TableCell>
                    <TableCell align="center">{data.type}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.description}</TableCell>
                    <TableCell align="center">{data.total}</TableCell>
                    <TableCell align="center">{moment(data.date).format('YYYY-MM-DD')}</TableCell>
                   
                  </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={apartmentCost.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
     
      <Controls.Button
        text="Download"
        color="secondary"
        onClick={() => saveCanvas()} />

      <Controls.Button
        text="Filter"
        color="primary"
        onClick={handleSubmit} />
    </div>
  );
};

export default CostTable;
