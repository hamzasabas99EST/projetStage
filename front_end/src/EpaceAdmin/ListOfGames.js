import React, { Component } from 'react';
import axios from 'axios';
import Search from '../components/SearchAdmin/Search';


class ListOfGames extends Component {
    constructor(props){ 
        super(props);  
        this.state={
          reservations:[]
        }
     }
     componentDidMount=()=>{
        const idCentre=localStorage.getItem("idCentre");
        axios.get(`http://localhost:9017/admins/GamesOfWeek/`+idCentre)
        .then(res=>{
            this.setState({
                reservations:res.data
            })
        })

    }
    
       
    
      search=(DateDeMatch,idHourGame)=>{
        const idCentre=localStorage.getItem("idCentre");
        if(idHourGame!=='' ){
          axios.get(`http://localhost:9017/admins/GamesSearch/`+idCentre+`/`+DateDeMatch+`/`+idHourGame)
          .then(res=>{console.log(res.data)
            this.setState({
              reservations:res.data
            })
          })
          .catch(err=>console.log(err));
  
      }
    }
    
    render() {
        return (
            <div className="container1">
            <Search   searchReservation={this.search}/>
          <table className="admin" >
                <thead>
                  <tr>
                    <th>Terrain</th>
                    <th  data-th="Driver details">CIN</th>
                    <th colSpan="2">Nom et prenom </th>
                    <th>Telephone</th>
                    <th>Date Du Match</th>
                    <th>Heure Du Match</th>
                    <th>Statut</th>
                   
                  </tr>
                </thead>
                <tbody> 
                  {this.state.reservations.length===0 && 
                      <tr >
                        <td colSpan="8">aucun match</td>
                      </tr>
                  }
                  {this.state.reservations.map((reservation,index)=>(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{reservation.idClient.CIN}</td>
                        <td>{reservation.idClient.Nom}</td> <td>{reservation.idClient.Prenom}</td>
                        <td>{reservation.idClient.telephone}</td>
                        <td>{new Date(reservation.DateDeMatch).toLocaleDateString()}</td>
                        <td>{reservation.idHourGame.HeureDebut}:00h -> {reservation.idHourGame.HeureFin}:00h</td>
                        <td >
                            <span class="badge badge-success  px-md-4">{reservation.Status}</span>
                        </td>
                      
                    </tr>
                  ))
                  }
                </tbody>
                
              </table>
            
              
          </div>

        );
    }
}

export default ListOfGames;