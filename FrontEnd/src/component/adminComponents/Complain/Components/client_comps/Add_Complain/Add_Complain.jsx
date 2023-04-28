import React, { useState } from 'react'
import "./Add_Complain.scss"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_Complain = () => {

    const initialData = {
        owner_name: '',
        Select_Cat: '',
        complain: '',
        Email: '',
        Status: 'Not Checked',
        Complain_No: '',
        Contact_No: '',
    };

    const [formdata, setFormData] = useState(initialData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formdata, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isNaN(formdata.Complain_No)) {
            toast.warn('Enter a Number for Complain Number!')
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

        try {
            const response = await axios.post('/complain/add', formdata);
            console.log(response.data); // if you want to log the response data
            
            //nofify
            toast.success('successfull')
            
            setFormData(initialData); // reset the form data after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="apply_from_container">
            <div className="top">
                <h1> Add Complain </h1>

            </div>


            <div className="container">

                <div className="contactForm">
                    <form onSubmit={handleSubmit}>
                        <h2> Add Complain </h2>

                        <div className="inputbox">
                            <input type="text"
                                required
                                name="Complain_No"
                                value={formdata.Complain_No}
                                onChange={handleInputChange} />
                            <span> Complain No  </span>
                        </div>
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
                        <div className="">
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

export default Add_Complain
