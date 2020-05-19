import React, { Component } from 'react';
import {  MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle,  MDBRow, MDBCol, MDBView } from 'mdbreact';
import axios from 'axios';

export default class Service extends Component {
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
        console.log(this.state.terrains)
        return (
            <div style={{marginTop:"50px",width:"90%",marginLeft:"50px"}}>
                <MDBRow>
                    <MDBCol md='4'>
                        <MDBCard wide cascade>
                        <MDBView cascade>
                            <MDBCardImage
                            hover
                            overlay='white-slight'
                            className='card-img-top'
                            src='data:image/jpeg;base64,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'
                            alt='Card cap'
                            />
                        </MDBView>

                        <MDBCardBody cascade className='text-center'>
                            <MDBCardTitle className='card-title'>
                            <strong>Cetnres</strong>
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
                            src='https://www.challenges.fr/assets/img/2014/10/27/cover-r4x3w1000-57914df9cf166-urban-foot.jpg'
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
                            src='https://thumbs.dreamstime.com/b/man-talking-personal-coach-gym-fitness-instructor-writing-training-plan-young-guy-flat-vector-illustration-cartoon-116152161.jpg'
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
        )
    }
}
