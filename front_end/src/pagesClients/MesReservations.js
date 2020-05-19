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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
         axios.delete(`http://localhost:9017/reservations/annuler/`+id)
        .then(res=>console.log(res.data))
        .catch(err=>console.log('Error : '+err))
        this.setState({
          reservations:this.state.reservations.filter(el=>el._id!==id)
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
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
                <th>Date De Match</th>
                <th>Heure  De Match</th>
                <th>Status</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody> 
              {this.state.reservations.map((reservation)=>(
                  <tr key={reservation._id}>
                    <td>{reservation.idCentre.NomCentre} </td>
                    <td>{new Date(reservation.DateDeMatch).toLocaleDateString()}</td>
                    <td>{reservation.idHourGame.HeureDebut}:00h -> {reservation.idHourGame.HeureFin}:00h</td>
                    <td >
                      {reservation.Status==='Refuser'
                       ? <span className="badge badge-danger  px-md-4">{reservation.Status}</span>
                       : <span className="badge badge-warning  px-md-4">{reservation.Status}</span>
                      }
                    </td>
                    <td >
                      {(reservation.Status!=='Refuser' && reservation.Status!=='Updated') && 
                       <Link to="#" className="btn btn-danger" onClick={()=>this.CanceledReservation(reservation._id)} data-toggle="tooltip" title="Annuler La réservation"><FontAwesomeIcon icon={faWindowClose}/></Link> 
                    }
                       </td>
                    <td>
                      <Link className='btn btn-primary ' to={"/EspaceClient/UpdateReservation/"+reservation._id} data-toggle="tooltip" title="Modifier La réservation" ><FontAwesomeIcon icon={faEdit}/></Link>
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
