import React, { Component } from 'react';

import axios from 'axios';
import SearchClient from '../components/SearchClient/SearchClient';

export default class MesMatches extends Component {
    
    constructor(props){ 
        super(props);  
       this.state={
            reservations:[],
            
        } 
    }
    
    componentDidMount=()=>{
        const  idClient=localStorage.getItem('id');
        const idVille=localStorage.getItem("idVille");
        axios.get(`http://localhost:9017/reservations/GamesOfClients/`+idClient+`/`+idVille)
        .then(res=>{
            this.setState({
              reservations:res.data
            })
          })
      }

      GameByClient=(Centre)=>{
        const  idClient=localStorage.getItem('id');
        axios.get(`http://localhost:9017/reservations/SearchByclientsGames/`+idClient+`/`+Centre)
        .then(res=>{
          this.setState({
            reservations:res.data
          })
        })
      }
    
    render() {
        return (
            <div className="container1">
                  <SearchClient SearchReservations={this.GameByClient}/>
                 <table className="responstable">
            <thead>

              <tr>
                <th ><span>Centre</span></th>
                <th>Date De Match</th>
                <th>Date De Heure</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody> 
              {this.state.reservations.map(reservation=>(
                  <tr key={reservation._id}>
                    <td>{reservation.idCentre.NomCentre}</td>
                    <td>{new Date(reservation.DateDeMatch).toLocaleDateString()}</td>
                    <td>{reservation.idHourGame.HeureDebut}:00h -> {reservation.idHourGame.HeureFin}:00h</td>
                    <td><span className="badge badge-success  px-md-5">{reservation.Status}</span></td>
                </tr>
              ))
            
              }
            </tbody>
            
          </table>
         
            </div>
        )
    }
}
