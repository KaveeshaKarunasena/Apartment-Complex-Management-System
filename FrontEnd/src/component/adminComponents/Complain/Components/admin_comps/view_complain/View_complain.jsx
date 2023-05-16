import React from 'react'
// import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { userColums, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./View_complain.scss";

const View_complain = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/complain/")
            .then((res) => {
                const rows = res.data.map((row, index) => ({ ...row, id: index }));
                setData(rows);
                //console.log(rows)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const columns = [
        // { field: "_id", headerName: " _id", width: 150 },
        { field: "Complain_No", headerName: "Complain_No", width: 250 },
        { field: "complain", headerName: "complain", width: 650 },
        { field: "Status", headerName: "Status", width: 200 },

    ];
    console.log(columns)



    const handleDelete = (id) => {
        axios.delete(`/complain/delete/${id}`)
            .then((res) => {
                console.log(`Row with ID ${id} deleted successfully`);
                console.log(`Row with ID ${id} deleted successfully`);
                setData(data.filter((item) => item.id !== id));
                window.location.reload();
            })
            .catch((err) => {
                console.error(`Failed to delete row with ID ${id}: ${err.message}`);
            });
    };


    const actionColum = [
        {
            field: "action",
            headerName: "Action",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/Comlpain/${params.row._id}`} style={{ textDecoration: "none" }} state={{ id: params.row._id }}>
                            <div className="viewButton"> View </div>
                        </Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}  > Delete </div>
                    </div>
                );
            },
        }
    ];




    return (
        <div className='view'>
            <div className="datatable">
                <div className="title">
                    All complains
                </div>

                <DataGrid
                    className="datagrid"
                   
                    rows={data}
                     columns={columns.concat(actionColum)}
                   // columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    // getRowId={(row) => row.id}
                />


            </div>
        </div>
    )
}

export default View_complain
