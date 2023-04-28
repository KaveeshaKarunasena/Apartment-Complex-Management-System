import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./Update_Complain.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update_Complain = () => {



    const initialData = {
        owner_name: '',
        Select_Cat: '',
        complain: '',
        Email: '',
        Status: 'Not Checked',
        Contact_No: '',
    };

    const [formdata, setFormData] = useState(initialData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formdata, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectId) {
            toast.warn('select a complain No!')
            //alert("Enter a Number for Complain Number");
            return;
        }
        if (isNaN(formdata.Contact_No)) {
            toast.warn('Enter a Number for Contact Number!')
            //alert("Enter a Number for Contact Number");
            return;
        }
        const checkbox = document.getElementsByName("myCheckbox")[0];
        if (!checkbox.checked) {
            toast.warn("Please check the 'I am Not A Robot' checkbox")
            //alert("Please check the 'I am Not A Robot' checkbox");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formdata.Email)) {
            toast.warn('Email address is invalid!')
            //alert("Email address is invalid");
            return;
        }

        event.preventDefault();
        try {
            console.log(selectId);
            const response = await axios.put(`/complain/update/${selectId}`, formdata);

            console.log("end");
            console.log(response.data); // if you want to log the response data
            setFormData(initialData); // reset the form data after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    //------------get id---------------

    // const [formdataId, setFormdataId] = useState({
    //     Complain_No: "",
    // });

    // const [data, setData] = useState([]);
    const [c_id, setCId] = useState([]);

    useEffect(() => {
        axios.get(`/complain/${selectId}`)
            .then((res) => {
                const rows = res.data.map((row, index) => ({ ...row, id: index }));
                setCId(rows);
                //console.log(rows)
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    //console.log(c_id[0]._id);
    const [selectId, setSelectId] = useState("");

    const handleSelectChange = (event) => {
        setSelectId(event.target.value);
    };




    return (
        <div className='Up_com'>



            <div className="select_Type">
                <h1> Update Complain  </h1>

            </div>
            <div className="container">
                <div className="contactForm">
                    <form onSubmit={handleSubmit}>

                        <div className="heder">
                            <h2>Update Complain</h2>
                        </div>

                        {/* //-------------------------------------------- */}
                        <div className="Form_name">
                            <div className="Form_name">
                                <label htmlFor="complain">Select a Complain No:</label>
                                <select id="complain" name="complain" value={selectId} onChange={handleSelectChange}>
                                    <option value=""> </option>
                                    {c_id.map((complain, index) => (
                                        //  <option key={index} value="{complain._id}"></option>
                                        <option key={index} value={complain._id}>
                                            {complain.Complain_No}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* //-------------------------------------------- */}


                        <div className="inputbox">
                            <input type="text"
                                required
                                name="owner_name"
                                value={formdata.owner_name}
                                onChange={handleInputChange} />

                            <span> Owner Name </span>
                        </div>

                        <div className="inputbox">
                            <input type="text"
                                required
                                name="Select_Cat"
                                value={formdata.Select_Cat}
                                onChange={handleInputChange} />

                            <span> Complain Category </span>
                        </div>

                        <div className="inputbox">
                            <input type="text"
                                required
                                name="complain"
                                value={formdata.complain}
                                onChange={handleInputChange} />

                            <span> Complain </span>
                        </div>

                        <div className="inputbox">
                            <input type="text"
                                required
                                name="Contact_No"
                                value={formdata.Contact_No}
                                onChange={handleInputChange} />

                            <span> Contact Number </span>
                        </div>

                        <div className="inputbox">
                            <input type="text"
                                required
                                name="Email"
                                value={formdata.Email}
                                onChange={handleInputChange} />

                            <span> Email </span>
                        </div>

                        <div className="im_not_check">
                            <input type="checkbox" name="myCheckbox" value="isChecked" /> I am Not A Robot
                        </div>
                        
                        <div className="submitBttn">
                            <button type='submit'>Enter</button>
                        </div>

                    </form>
                </div>




            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>



    )
}

export default Update_Complain
