import React ,{Component} from 'react'
import './NavPages.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios'

class EditApartments extends Component{

constructor(props) {
      super(props)
    
      this.state = {
        apartmentno : "",
        floor : "",
        buildingNo : "",
        type : "",
        status: "",
        ownersName: ""
      }
    }

onInputChange =(e) =>{

        this.setState ({...this.state,[e.target.name]:e.target.value});
    }
    

componentDidMount(){
    const id = window.location.href.split('/')[4]

        console.log(id);

        axios.get(`/apartment/getById/${id}`)
        .then((res)=>{
            if(res.data.success){
            this.setState({

                apartmentno : res.data.apartmentModel.apartmentno,
                floor : res.data.apartmentModel.floor,
                buildingNo : res.data.apartmentModel.buildingNo,
                type : res.data.apartmentModel.type,
                status: res.data.apartmentModel.status,
                ownersName: res.data.apartmentModel.ownersName

            })
        }
        })
    }

handleSubmit = async(e) =>{
        e.preventDefault();
        const id = window.location.href.split('/')[4]
        const {apartmentno,floor,buildingNo,type,status,ownersName} = this.state;
      
        const data ={
            apartmentno : apartmentno,
            floor : floor,
            buildingNo : buildingNo,
            type : type,
            status: status,
            ownersName: ownersName,
        }
      
         console.log(data);
            
            await axios.put(`/apartment/update/${id}`,data)
            .then ((res)=> {
              alert("Data Updated");  window.location.reload();
                if(res.data.success){
                    
                    this.setState({
                        apartmentno : "",
                        floor : "",
                        buildingNo : "",
                        type : "",
                        status: "",
                        ownersName: "",
                    })
                    
                }
           
           })
           
           
            
            .catch((err) => alert(`Something went wrong : ${err}`))
        }



    render() {

        return(
        <div className='container'>
          <div className='Form'>
          <h3> Add Apartment</h3>
            <Form onSubmit={e =>this.handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Apartment No</Form.Label>
              <Form.Control  type="text"  placeholder="Apartment No" name='apartmentno' value={this.state.apartmentno} onChange={(e)=>this.onInputChange(e)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Floor</Form.Label>
              <Form.Control type="text" placeholder="Floor" name='floor' value={this.state.floor} onChange={(e)=>this.onInputChange(e)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Building No</Form.Label>
              <Form.Control type="text" placeholder="Building No" name='buildingNo' value={this.state.buildingNo} onChange={(e)=>this.onInputChange(e)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Apartment Type</Form.Label>
              <Form.Control type="text" placeholder="Apartment Type" name='type' value={this.state.type} onChange={(e)=>this.onInputChange(e)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder="Status" name='status' value={this.state.status} onChange={(e)=>this.onInputChange(e)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Owners Name</Form.Label>
              <Form.Control type="text" placeholder="Owners Name" name='ownersName' value={this.state.ownersName} onChange={(e)=>this.onInputChange(e)}/>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Im not a robot" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            </Form>
        </div>
    
      </div>
        )
         
    }
}

export default EditApartments

