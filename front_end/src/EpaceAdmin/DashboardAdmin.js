import React, { Component } from 'react';
import axios from 'axios';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";


class DashboardAdmin extends Component {
    constructor(props){ 
        super(props);  
        
        this.state={
            dataPie: {
                labels: ["En attente", "Modifiée", "Acceptée", "Refusée"],
                datasets: [
                  {
                    data: [30, 150, 100, 40],
                    backgroundColor: [
                      "#ff4000",
                      "#46BFBD",
                      "#48bf46",
                      "#ff0000",
                      
                      
                    ],
                    hoverBackgroundColor: [
                      "#ff4000",
                      "#46BFBD",
                      "#48bf46",
                      "#ff0000",
                      
                    ]
                  }
                ]
              },
              nombreTotal:0
        }
    }

    componentDidMount=()=>{
        const  idCentre=localStorage.getItem("idCentre");
        axios.get(`http://localhost:9017/admins/StatistiqueOfCentre/`+idCentre)
       .then(res=>{console.log(res.data)
                this.setState({
                    dataPie: {
                        datasets: [
                          {
                            data: [res.data.entAttente,res.data.Updated, res.data.Accepter, res.data.Refuser]
                          }
                        ]
                    },
                    nombreTotal:res.data.entAttente+res.data.Updated+res.data.Accepter+res.data.Refuser
                })
        })
    }
    render() {
        console.log( )
        return (
            <div className="container1">
                <MDBContainer  >
                      <h3 className="mt-5">Nombre total des reservations {this.state.nombreTotal}</h3>
                    <Pie data={this.state.dataPie} options={{ responsive: true }}   maintainAspectRatio={true} />
                 </MDBContainer>
                 
            </div>
        );
    }
}

export default DashboardAdmin;