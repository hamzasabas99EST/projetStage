import React, { Component } from 'react';
import axios from 'axios';
import { faCheck,faFastBackward,faFastForward,faStepBackward,faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';
import Search from '../components/SearchAdmin/Search';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {InputGroup, Button} from 'react-bootstrap'




class ListOfReservations extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            reservations:[],
            accepter:0,
            nombreTerrain:0,
            currentPage:1,
            reservationPerPages:10

          
        }
     }
    componentDidMount=async()=>{
        const idCentre=await localStorage.getItem("idCentre");

        axios.get(`http://localhost:9017/admins/findReservationbyCentre/`+idCentre)
        .then(res=>
           {
             console.log(res)
            this.setState({
                reservations:res.data.reservations,
                accepter:res.data.numberAccept,
                nombreTerrain:res.data.terrain
                
            })
        })

        
    }
   

    
    search=(DateDeMatch,idHourGame)=>{
      const idCentre=localStorage.getItem("idCentre");
      if(idHourGame!=='' ){
        axios.get(`http://localhost:9017/admins/ReservationsSearch/`+idCentre+`/`+DateDeMatch+`/`+idHourGame)
        .then(res=>{console.log(res.data)
          this.setState({
            reservations:res.data.reservations,
            accepter:res.data.numberAccept,
            nombreTerrain:res.data.terrain

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
          reservation.Status="Acceptée"
        }
        return reservation.Status
      }  ),
      accepter:this.state.accepter+1
    });
    if(this.state.accepter===this.state.nombreTerrain){
      await this.setState({
        reservations:this.state.reservations.filter(reservation =>{
          if(reservation._id !== id && reservation.Status!=="Acceptée"){
             axios.post(`http://localhost:9017/admins/Rejectall/`+reservation.idCentre._id+`/`+reservation.DateDeMatch+`/`+reservation.idHourGame._id)
            
             reservation.Status="Refusée"
          }
          return reservation.Status
        }  )

      });
      
      await Swal.fire({
        title: 'les terrains sont occupés ',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

    }
  }

  RejectReservation=async(id)=>{
    axios.post(`http://localhost:9017/admins/Reject/`+id)
      await this.setState({
        reservations:this.state.reservations.filter(reservation =>{
          if(reservation._id === id){
            reservation.Status="Refusée"
          }
          return reservation.Status
        }  )
      })
    }
  /**Pagination */
 
  firstPage=()=>{
    if(this.state.currentPage>1){
      this.setState({
        currentPage:1
      })
    }
  }
  PrevPage=()=>{
    if(this.state.currentPage>1){
      this.setState({
        currentPage:this.state.currentPage-1
      })
    }
  }

  lastPage=()=>{
    if(this.state.currentPage < Math.ceil(this.state.reservations.length/this.state.reservationPerPages)){
      this.setState({
        currentPage: Math.ceil(this.state.reservations.length/this.state.reservationPerPages)
      })
    }
  }
  nextPage=()=>{
    if(this.state.currentPage < Math.ceil(this.state.reservations.length/this.state.reservationPerPages)){
      this.setState({
        currentPage:this.state.currentPage+1
      })
    }
  }

    render() {
      //Pagination
      const {reservations,currentPage,reservationPerPages}=this.state;
      const lastIndex=currentPage * reservationPerPages;
      const firstIndex=lastIndex-reservationPerPages;
      const currentReservations=reservations.slice(firstIndex,lastIndex);
      const totalPages=(reservations.length / reservationPerPages);
     
      return (

            <div className="container1">
              <Search   searchReservation={this.search}/>
              <div  className="pagination">
                      <div className="text-pagination">
                          Pages {currentPage}
                      </div>
                          <div className="items-pagination">
                              <InputGroup >

                                <InputGroup.Prepend >
                                    <Button type="button" variant="outline-light " disabled={currentPage ===1 ? true : false } onClick={this.firstPage} data-toggle="tooltip" title="premiere page">
                                      <FontAwesomeIcon icon={faFastBackward}/>  
                                    </Button>
                                    <Button type="button" variant="outline-light " disabled={currentPage ===1 ? true : false } onClick={this.PrevPage} data-toggle="tooltip" title="précedente page">
                                          <FontAwesomeIcon icon={faStepBackward}/>
                                    </Button>
                                </InputGroup.Prepend>
                                  
                                <InputGroup.Prepend >
                                    <Button type="button" variant="outline-light " disabled={currentPage ===totalPages ? true : false } onClick={this.nextPage} data-toggle="tooltip" title="prochaine page">
                                    <FontAwesomeIcon icon={faStepForward}/>  
                                    </Button>
                                    <Button type="button" variant="outline-light " disabled={currentPage ===totalPages ? true : false } onClick={this.lastPage} data-toggle="tooltip" title="dérniere page">
                                      <FontAwesomeIcon icon={ faFastForward}/> 
                                    </Button>
                                </InputGroup.Prepend>

                              </InputGroup>
                        </div>
                    </div>

            <table className="admin" >
                  <thead>
                    <tr>
                      <th  >CIN</th>
                      <th colSpan="2">Nom et prenom </th>
                      <th>Date Du Match</th>
                      <th>Heure Du Match</th>
                      <th>Statut</th>
                      <th colSpan="2">Action</th>
                    </tr>
                  </thead>
                  <tbody> 
                  {reservations.length===0 &&
                    <tr>
                      <td ColSpan="8"> aucune réservation </td>
                    </tr>
                        
                  }
                    {currentReservations.map(reservation=>(
                        <tr key={reservation._id}>
                          <td>{reservation.idClient.CIN}</td>
                          <td>{reservation.idClient.Nom}</td>
                          <td>{reservation.idClient.Prenom}</td>
                          <td>{new Date(reservation.DateDeMatch).toLocaleDateString()}</td>
                          <td>{reservation.idHourGame.HeureDebut}:00h -> {reservation.idHourGame.HeureFin}:00h</td>
                          <td >
                              {reservation.Status==='Refusée'
                              ? <span className="badge badge-danger  px-md-4">{reservation.Status}</span>
                              : reservation.Status==='Acceptée' ? <span className="badge badge-success  px-md-4">{reservation.Status}</span>
                              : <span className="badge badge-warning  px-md-4">{reservation.Status}</span>
                            }
                          </td>
                          <td >
                          {(reservation.Status!=="Acceptée" && reservation.Status!=="Refusée" && this.state.accepter<this.state.nombreTerrain) &&
                            <Link to="#" className="btn btn-success" onClick={()=>this.AcceptReservation(reservation._id) } data-toggle="tooltip" title="Accepter La réservation"><FontAwesomeIcon icon={faCheck}/></Link>  
                         }

                          
                          </td>
                          <td>
                            {reservation.Status!=="Acceptée"&& reservation.Status!=="Refusée" &&
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

export default ListOfReservations;