import React, { Component } from 'react';
import axios from 'axios';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Card } from 'react-bootstrap';

class DashboardClient extends Component {

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
                      "#ff0000"
                      
                    ],
                    hoverBackgroundColor: [
                      "#ff4000",
                      "#46BFBD",
                      "#48bf46",
                      "#ff0000"
                    ]
                  }
                ]
              },
              nombreTotal:0,
              centres:[],
              Ville:''
        }
    }

    componentDidMount=async()=>{
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
        const idVille=localStorage.getItem('idVille');

        await this.getCities(idVille);
    }

    getCities=(idVille)=>{
      axios.get(`http://localhost:9017/centres/findCentres/`+idVille)
      .then(res=>{
          this.setState({
              centres:res.data,
              Ville:res.data[0].idVille.NomVille
              
          })
      })
      .catch(err=>console.log(err));
  }

    render() {
      return (
            <div className="container1">
                     <h1 className="text-center" style={{background:"#024457",width:"90%",marginLeft:'6%',marginTop:"3%"}}> Liste des centres au {this.state.Ville} </h1>
                <div className="row">
                    {this.state.centres.map(centre=>
                    <Card style={{ width: '18rem',margin:'5%' }} className="col bg-light">
                      <Card.Body>
                        <Card.Title className="text-center">{centre.NomCentre}</Card.Title>
                        <Card.Subtitle className="text-center">{centre.idVille.NomVille}</Card.Subtitle>
                        <Card.Text>
                           <b>Adresse</b> : {centre.Adresse}
                        </Card.Text>
                        <footer className="blockquote-footer">
                          Telephone : <cite title="Source Title">{centre.telephone}</cite>
                        </footer>
                      </Card.Body>
                    </Card>
                    )}
                </div>
                
                <MDBContainer  >
                      <h3 className="mt-5">Statistique sur {this.state.nombreTotal} reservations </h3>
                    <Pie data={this.state.dataPie} options={{ responsive: true }} />
                 </MDBContainer>
            </div>
        );
    }
}

export default DashboardClient;