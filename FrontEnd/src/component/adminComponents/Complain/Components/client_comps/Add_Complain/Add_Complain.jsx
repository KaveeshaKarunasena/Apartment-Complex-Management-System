import React, { useState } from 'react'
import "./Add_Complain.scss"
import axios from 'axios';

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
            alert("Enter a Number for Complain Number");
            return;
        }

        if (isNaN(formdata.Contact_No)) {
            alert("Enter a Number for Contact Number");
            return;
        }
        const checkbox = document.getElementsByName("myCheckbox")[0];
    if (!checkbox.checked) {
        alert("Please check the 'I am Not A Robot' checkbox");
        return;
    }
        try {
            const response = await axios.post('http://localhost:8070/complain/add', formdata);
            console.log(response.data); // if you want to log the response data
            setFormData(initialData); // reset the form data after successful submission
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='Add_Complain_Containner'>

            <div className="select_Type">Add Complain</div>
            <div className="form_Contanner">
                <div className="form">
                    <form onSubmit={handleSubmit}>

                        <div className="heder">
                            <span>Add Complain</span>
                        </div>
                        <div className="Form_name">
                            <span> Complain No </span>
                            <input type="text"
                                required
                                name="Complain_No"
                                value={formdata.Complain_No}
                                onChange={handleInputChange} />
                        </div>
                        <div className="Form_name">
                            <span> Owner Name </span>
                            <input type="text"
                                required
                                name="owner_name"
                                value={formdata.owner_name}
                                onChange={handleInputChange} />
                        </div>
                        <div className="Form_comcat">
                            <span> Complain Category </span>
                            <input type="text"
                                required
                                name="Select_Cat"
                                value={formdata.Select_Cat}
                                onChange={handleInputChange} />
                        </div>
                        <div className="Form_complain">
                            <span> Complain </span>
                            <input type="text"
                                required
                                name="complain"
                                value={formdata.complain}
                                onChange={handleInputChange} />
                        </div>

                        <div className="Form_complain">
                            <span> Contact Number </span>
                            <input type="text"
                                required
                                name="Contact_No"
                                value={formdata.Contact_No}
                                onChange={handleInputChange} />
                        </div>



                        <div className="email">
                            <span> Email </span>
                            <input type="text"
                                required
                                name="Email"
                                value={formdata.Email}
                                onChange={handleInputChange} />
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


        </div>
    )
}

export default Add_Complain
