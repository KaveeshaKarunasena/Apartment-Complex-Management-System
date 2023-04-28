import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import "./Single_complain.scss"

const Single_complain = () => {
    const location = useLocation();
    const id = location.state?.id;
    const [item, setItem] = useState({});

    // console.log("xxxx")

    //get single ( sleceted data ) data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/complain/get/${id}`);
                setItem(response.data);
                //console.log(response.data);
                console.log(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchData();
    }, [id]);

    if (Object.keys(item).length === 0) {
        // data is still being fetched, show loading indicator or something else
        return <div>Loading...</div>;
    }
    //console.log(item.fetchedItem.owner_name );


    return (
        <div className="Single_complain">
            <div className="container">
                <div className="contactForm">


                    <div className="title">
                        Detail about complain
                    </div>
                    <div className="center">


                        <div className="details">

                            <div className="items">
                                <span >owner name</span>
                                <p>{item.fetchedItem.owner_name}</p>

                            </div>

                            <div className="items">
                                <span>complain</span>
                                <p>{item.fetchedItem.complain}</p>

                            </div>

                            <div className="items">
                                <span>Email</span>
                                <p>{item.fetchedItem.Email}</p>

                            </div>

                            <div className="items">
                                <span>Select Cat</span>
                                <p>{item.fetchedItem.Select_Cat}</p>

                            </div>

                            <div className="items">
                                <span>Status</span>
                                <p>{item.fetchedItem.Status}</p>

                            </div>

                            <div className="items">
                                <span>Complain No</span>
                                <p>{item.fetchedItem.Complain_No}</p>

                            </div>

                            <div className="items">
                                <span>Contact No</span>
                                <p>{item.fetchedItem.Contact_No}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single_complain;
