import React, { Component } from 'react'
import axios from 'axios';
import '../css/table.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import { faWindowClose } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import SearchClient from '../components/SearchClient/SearchClient';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'



export default class MesReservations extends Component {
  constructor(props){ 
    super(props);  
   this.state={
        reservations:[],
        
    } 
}

componentDidMount=()=>{
    const  idClient=localStorage.getItem('id');
    const idVille=localStorage.getItem("idVille")
    axios.get(`http://localhost:9017/reservations/byclients/`+idClient+`/`+idVille)
    .then(res=>{
        this.setState({
          reservations:res.data
           
        })
      })
  }
  CanceledReservation(id){
   /* */
    Swal.fire({
      title: 'Etes-vous sûr ?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.value) {
         axios.delete(`http://localhost:9017/reservations/annuler/`+id)
        .then(res=>console.log(res.data))
        .catch(err=>console.log('Error : '+err))
        this.setState({
          reservations:this.state.reservations.filter(el=>el._id!==id)
        })
        Swal.fire(
          'Votre réservation',
          'a été supprimé.',
          'success'
        )
      }
    })
} 

SearchReservations=(Centre)=>{
  const  idClient=localStorage.getItem('id');
  axios.get(`http://localhost:9017/reservations/SearchByclients/`+idClient+`/`+Centre)
  .then(res=>{
    this.setState({
      reservations:res.data
    })
  })
}
  render() {
    
   
         
    return (
      
      <div className="container1">
          <SearchClient SearchReservations={this.SearchReservations}/>
          <table className="responstable">
            <thead>
              <tr>
                <th data-th="Driver details"><span>Centre</span></th>
                <th>Date Du Match</th>
                <th>Heure Du Match</th>
                <th>Statut</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody> 
            {this.state.reservations.length===0 &&
                    <tr>
                      <td ColSpan="8"> aucune réservation </td>
                    </tr>
                        
              }
              {this.state.reservations.map((reservation)=>(
                  <tr key={reservation._id}>
                    <td>{reservation.idCentre.NomCentre} </td>
                    <td>{new Date(reservation.DateDeMatch).toLocaleDateString()}</td>
                    <td>{reservation.idHourGame.HeureDebut}:00h -> {reservation.idHourGame.HeureFin}:00h</td>
                    <td >
                      {reservation.Status==='Refusée'
                       ? <span className="badge badge-danger  px-md-4">{reservation.Status}</span>
                       : <span className="badge badge-warning  px-md-4">{reservation.Status}</span>
                      }
                    </td>
                    <td >
                      {reservation.Status==='En attente'  && 
                       <Link to="#" className="btn btn-danger" onClick={()=>this.CanceledReservation(reservation._id)} data-toggle="tooltip" title="Annuler La réservation"><FontAwesomeIcon icon={faWindowClose}/></Link> 
                      }
                       </td>
                    <td>
                      {reservation.Status!=='Refusée'  && 
                      <Link className='btn btn-primary ' to={"/EspaceClient/UpdateReservation/"+reservation._id} data-toggle="tooltip" title="Modifier La réservation" ><FontAwesomeIcon icon={faEdit}/></Link>
                      }
                    </td>

                </tr>
              ))
            
              }
            </tbody>
            
          </table>
         
        
      </div>
    )
  }
}
