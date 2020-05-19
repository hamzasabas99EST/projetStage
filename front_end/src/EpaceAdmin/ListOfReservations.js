import React, { Component } from 'react';
import axios from 'axios';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import Search from '../components/SearchAdmin/Search';




class ListOfReservations extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            reservations:[],
          
        }
     }
    componentDidMount=()=>{
        const idCentre=localStorage.getItem("idCentre");
        axios.get(`http://localhost:9017/admins/findReservationbyCentre/`+idCentre)
        .then(res=>{
            this.setState({
                reservations:res.data
            })
        })

        
    }
    componentWillUpdate=async(nextProps,nextState) =>{
      return nextState.reservations!==this.state.reservations
  }

    
        
    
      
    search=(DateDeMatch,idHourGame)=>{
      const idCentre=localStorage.getItem("idCentre");
      if(idHourGame!=='' ){
        axios.get(`http://localhost:9017/admins/ReservationsSearch/`+idCentre+`/`+DateDeMatch+`/`+idHourGame)
        .then(res=>{
          this.setState({
            reservations:res.data
          })
        })
        .catch(err=>console.log(err));

    }
  }

  AcceptReservation=async(id)=>{
    axios.post(`http://localhost:9017/admins/Accept/`+id)
     await this.setState({
        reservations:this.state.reservations.filter(reservation =>{
          if(reservation._id === id){
            reservation.Status="Accepter"
          }
          return reservation.Status
        }  )
      })
      
  }

  RejectReservation=async(id)=>{
    axios.post(`http://localhost:9017/admins/Reject/`+id)
      await this.setState({
        reservations:this.state.reservations.filter(reservation =>{
          if(reservation._id === id){
            reservation.Status="Refuser"
          }
          return reservation.Status
        }  )
      })
    }
  
   
    render() {

      return (

            <div className="container1">
              <Search   searchReservation={this.search}/>
            <table className="admin" >
                  <thead>
                    <tr>
                      <th  data-th="Driver details">CIN</th>
                      <th colSpan="2">Nom et prenom </th>
                      <th>Date De Heure</th>
                      <th>Heure De Match</th>
                      <th>Status</th>
                      <th colSpan="2">Action</th>
                    </tr>
                  </thead>
                  <tbody> 
                    {this.state.reservations.map(reservation=>(
                        <tr key={reservation._id}>
                          <td>{reservation.idClient.CIN}</td>
                          <td>{reservation.idClient.Nom}</td> <td>{reservation.idClient.Prenom}</td>
                          <td>{new Date(reservation.DateDeMatch).toLocaleDateString()}</td>
                          <td>{reservation.idHourGame.HeureDebut}:00h -> {reservation.idHourGame.HeureFin}:00h</td>
                          <td >
                              {reservation.Status==='Refuser'
                              ? <span class="badge badge-danger  px-md-4">{reservation.Status}</span>
                              : reservation.Status==='Accepter' ? <span class="badge badge-success  px-md-4">{reservation.Status}</span>
                              : <span class="badge badge-warning  px-md-4">{reservation.Status}</span>
                            }
                          </td>
                          <td >
                          {reservation.Status!=="Accepter"&& reservation.Status!=="Refuser"&&
                            <Link to="#" className="btn btn-success" onClick={()=>this.AcceptReservation(reservation._id) } data-toggle="tooltip" title="Accepter La réservation"><FontAwesomeIcon icon={faCheck}/></Link>  
                         
                         }

                          
                          </td>
                          <td>
                            {reservation.Status!=="Accepter"&& reservation.Status!=="Refuser" &&
                              <Link to="#" className="btn btn-danger" onClick={()=>this.RejectReservation(reservation._id)} data-toggle="tooltip" title="Annuler La réservation"><FontAwesomeIcon icon={faWindowClose}/></Link> 
                            }     
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

/*
     <form class="form-inline">
               
                <div className="form-group1" >
                <label htmlFor="">Date de Debut</label>
                <DatePicker 
                    className="form-control1"  
                    onChange={this.onChangeDateDebut} 
                    selected={this.state.DateDeDebut}
                    placeholderText="Selectionner date de Debut"
                    />
            </div>
                

*/ 
export default ListOfReservations;