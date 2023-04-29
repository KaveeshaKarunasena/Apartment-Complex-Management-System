import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./Update_Complain.scss"

const Update_Complain = () => {



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
        try {
            const response = await axios.put(
                `/update/${selectId}`,
                formdata
            );
            // console.log(response.data); // if you want to log the response data
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
                console.log(err.message);
            });
    }, []);

    //console.log(c_id[0]._id);
    const [selectId, setSelectId] = useState("");

    const handleSelectChange = (event) => {
        setSelectId(event.target.value);
    };




    return (
        <div className='Up_com'>

            <div className='Add_Complain_Containner'>

                <div className="select_Type">Update Complain</div>
                <div className="form_Contanner">
                    <div className="form">
                        <form onSubmit={handleSubmit}>

                            <div className="heder">
                                <span>Update Complain</span>
                            </div>

                            {/* //-------------------------------------------- */}
                            <div className="Form_name">
                                <div className="Form_name">
                                    <label htmlFor="complain">Select a Complain No:</label>
                                    <select id="complain" name="complain" value={selectId} onChange={handleSelectChange}>
                                        {c_id.map((complain, index) => (
                                            <option key={index} value={complain._id}>
                                                {complain.Complain_No}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div className="Form_name">
                                <span> Complain No </span>
                                <input type="text"
                                    name="Complain_No"
                                    value={formdata.Complain_No}
                                    onChange={handleInputChange} />
                            </div>


                           
                           
                            {/* //-------------------------------------------- */}



                            <div className="Form_name">
                                <span> Owner Name </span>
                                <input type="text"
                                    name="owner_name"
                                    value={formdata.owner_name}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="Form_comcat">
                                <span> Complain Category </span>
                                <input type="text"
                                    name="Select_Cat"
                                    value={formdata.Select_Cat}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="Form_complain">
                                <span> Complain </span>
                                <input type="text"
                                    name="complain"
                                    value={formdata.complain}
                                    onChange={handleInputChange} />
                            </div>

                            <div className="Form_complain">
                                <span> Contact Number </span>
                                <input type="text"
                                    name="Contact_No"
                                    value={formdata.Contact_No}
                                    onChange={handleInputChange} />
                            </div>



                            <div className="email">
                                <span> Email </span>
                                <input type="text"
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


        </div>
    )
}

export default Update_Complain
