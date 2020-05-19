import React, { Component } from 'react';
import axios from 'axios';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class DashboardClient extends Component {

    constructor(props){ 
        super(props);  
        
        this.state={
            dataPie: {
                labels: ["En attente", "Updated", "Accepter", "Refuser"],
                datasets: [
                  {
                    data: [30, 150, 100, 40],
                    backgroundColor: [
                      "#ff4000",
                      "#46BFBD",
                      "#48bf46",
                      "#ff0000",
                      "#4D5360",
                      "#AC64AD"
                      
                    ],
                    hoverBackgroundColor: [
                      "#ff4000",
                      "#5AD3D1",
                      "#48bf46",
                      "#A8B3C5",
                      "#616774",
                      "#DA92DB"
                    ]
                  }
                ]
              },
              nombreTotal:0
        }
    }

    componentDidMount=()=>{
        const  idClient=localStorage.getItem('id');
        axios.get(`http://localhost:9017/reservations/StatistiqueOfClients/`+idClient)
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
                      <h3 className="mt-5">Statistique sur {this.state.nombreTotal} reservations </h3>
                    <Pie data={this.state.dataPie} options={{ responsive: true }} />
                 </MDBContainer>
            </div>
        );
    }
}

export default DashboardClient;