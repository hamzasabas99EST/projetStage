import React, { Component } from 'react';

import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle,  MDBRow, MDBCol, MDBView } from 'mdbreact';
import axios from 'axios';
import centre from "../images/centre.jpg"
import terrain from "../images/terrains.jpg" 
import employee from "../images/admiin.jpg" 
export default class About extends Component {
  constructor(props){
    super(props);
    this.state={
        admins:0,
        centres:0,
        terrains:0,
        villes:0
    }
}
componentDidMount=()=>{
  axios.get(`http://localhost:9017/centres/AboutUs`)
  .then(res=>{ console.log(res)
    this.setState({
      admins:res.data.admin,
      centres:res.data.centre,
      terrains:res.data.terrain,
      villes:res.data.ville
    })
  })
  .catch(err=>console.log(err));
}
    render() {
        return (
          <div className="container0">
          <div style={{marginTop:"50px",width:"90%",marginLeft:"50px"}}>
          <MDBRow>
              <MDBCol md='4'>
                  <MDBCard wide cascade>
                    <MDBView cascade>
                        <MDBCardImage
                        hover
                        overlay='white-slight'
                        className='card-img-top'
                        src={centre}
                        height='225px'
                        
                        alt='Card cap'
                        />
                    </MDBView>

                    <MDBCardBody cascade className='text-center'>
                        <MDBCardTitle className='card-title'>
                        <strong>Centres</strong>
                        </MDBCardTitle>
                            <p className='font-weight-bold blue-text'>{this.state.centres}</p>
                    </MDBCardBody>
                  </MDBCard>
              </MDBCol>

              <MDBCol md='4'>
                  <MDBCard narrow>
                    <MDBView cascade>
                        <MDBCardImage
                        hover
                        overlay='white-slight'
                        className='card-img-top'
                        src={terrain}
                        alt='food'
                        height='225px'
                        />
                    </MDBView>

                    <MDBCardBody cascade className='text-center'>
                        <MDBCardTitle className='card-title'>
                            <strong>Terrains</strong>
                        </MDBCardTitle>
                        <p className='font-weight-bold blue-text'>{this.state.terrains}</p>
                    </MDBCardBody>
                  </MDBCard>
              </MDBCol>

              <MDBCol md='4'>
                  <MDBCard>
                    <MDBCardImage
                        hover
                        overlay='white-light'
                        className='card-img-top'
                        src={employee}
                        alt='man'
                        height="225px"
                    />

                    <MDBCardBody cascade className='text-center'>
                        <MDBCardTitle className='card-title'>
                            <strong>Employees</strong>
                        </MDBCardTitle>
                            <p className='font-weight-bold blue-text'> plus de :{this.state.admins}</p>
                    </MDBCardBody>
                  </MDBCard>
              </MDBCol>
         </MDBRow> <br></br> <br></br>
      </div>
      </div>
        )
    }
}
