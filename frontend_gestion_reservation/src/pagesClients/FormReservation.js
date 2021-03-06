import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import { addDays,subDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import '../css/styleForm.css'

// you will also need the css that comes with bootstrap-daterangepicker

export default class FormReservation extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            HoursGame:[],
            idHourGame:'',
            centres:[],
            idCentre:'',
            DateDeMatch:'',
            DateDeDebut:'',
            DateDeFin:'',
            isSaved:false,
            HadGame:false,
            alreadyReserve:false,
            cantReserve:false,
            numberReservation:0
        }
        
        this.getCities=this.getCities.bind(this);
        this.getCient=this.getCient.bind(this);
        this.getHours=this.getHours.bind(this);
        this.getPeriode=this.getPeriode.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeHeure=this.onChangeHeure.bind(this);
        this.onChangeCentre=this.onChangeCentre.bind(this);
        this.onSend=this.onSend.bind(this);


    }

    componentDidMount=()=>{
       const  idVille=localStorage.getItem("idVille");
       this.getCities(idVille);
       this.getHours();
    }

    componentWillUpdate=async(nextProps,nextState) =>{
        if (nextState.idCentre !== this.state.idCentre) {
            const idCentre =await nextState.idCentre ;
            await this.getPeriode( idCentre );
            await this.getCient(idCentre);
        }

       
        }
    
    
    getCient=async(idCentre)=>{
        const  idClient=localStorage.getItem('id');

       await axios.get(`http://localhost:9017/reservations/client/`+idClient+'/'+idCentre)
        .then(res=>{console.log(res.data)
            if(res.data.hadGame){
                this.setState({
                   HadGame:true 
                }) 
            }
            else{
                if(res.data.Reservation.length===0 ){
                    this.setState({
                    numberReservation:res.data.Reservation.length,
                    
                })
                }else if( res.data.Reservation.length<6){
                        this.setState({
                        numberReservation:res.data.Reservation.length,
                        DateDeMatch:addDays(new Date(res.data.Reservation[res.data.Reservation.length-1].DateDeMatch),1)    
                        
                    })
                    
                } else  if(res.data.Reservation.length===6){
                            this.setState({
                                alreadyReserve:true,
                                DateDeMatch:new Date(res.data.Reservation[5].DateDeMatch)
                            })
                        
                    }
                }
                  }
                  )
      
      
    }

    getCities=(idVille)=>{
        axios.get(`http://localhost:9017/centres/findCentres/`+idVille)
        .then(res=>{
            this.setState({
                centres:res.data,
                NomCentre:res.data[0].NomCentre
            })
        })
        .catch(err=>console.log(err));
    }

    getHours=()=>{
        axios.get(`http://localhost:9017/reservations/allHours`)
        .then(res=>{
            this.setState({
                HoursGame:res.data,
                idHourGame:res.data[0]._id
            })
        })
        .catch(err=>console.log(err));
    }

    getPeriode=(idCentre)=>{
        axios.get(`http://localhost:9017/admins/findPeriod/`+idCentre)
        .then(res=>{
            this.setState({
                DateDeDebut:res.data[0].DateDeDebut,
                DateDeFin:res.data[0].DateDeFin,
                DateDeMatch:addDays(new Date(res.data[0].DateDeDebut),this.state.numberReservation) 

            })
        })
        .catch(err=>console.log(err));
        
    }

    

    onChangeDate=(DateDeMatch)=>{
        this.setState({
            DateDeMatch:DateDeMatch
        })
    }
    onChangeHeure=(e)=>{
        this.setState({
            idHourGame:e.target.value
        })
    }
    onChangeCentre=async(e)=>{
        await this.setState({
            idCentre:e.target.value
        })
    }

     
 /*   search=(idCENTRE,DateDeMatch,idHourGame)=>{
        
          axios.get(`http://localhost:9017/admins/ReservationsSearch/`+idCENTRE+`/`+DateDeMatch+`/`+idHourGame)
          .then(res=>{console.log(res.data)
            this.setState({
              reservations:res.data.reservations,
              accepter:res.data.numberAccept,
              nombreTerrain:res.data.terrain
  
            })
          })
          .catch(err=>console.log(err));
  
      
    }*/

    onSend=(e)=>{
        e.preventDefault();
        const idClient=localStorage.getItem("id");
        const Reservation={
            DateDeMatch:this.state.DateDeMatch,
            idHourGame:this.state.idHourGame,
            idClient:idClient,
            idCentre:this.state.idCentre
        }
        
        
        axios.post(`http://localhost:9017/reservations/addReservation/`,Reservation)
        .then(res=>{
            if(res.status===200){
                this.setState({
                    isSaved:true,
                    numberReservation:this.state.numberReservation+1,
                    DateDeMatch:addDays(this.state.DateDeMatch,1)
                })
                if(this.state.numberReservation===6){
                    this.setState({
                        alreadyReserve:true,
                        centres:[],
                        HoursGame:[]
                    })
                }
            }
        })
        .catch(err=>console.log(err))
        
    }
    
    render() {
        console.log(this.state.numberReservation)
        
        return (
            <div  className="container1">
                {(this.state.isSaved ) &&
                <Alert  variant="success ">
                     <Alert.Heading>Cher(e) {localStorage.getItem("name")}</Alert.Heading>
                     Vous avez bien envoyé cette réservation le {`la date `+subDays(new Date(this.state.DateDeMatch),1).toLocaleDateString()},
                      Vous avez encore {``+6-this.state.numberReservation} reservations 
                </Alert>                    
                }
                {(this.state.alreadyReserve || this.state.numberReservation===6) &&  
                <Alert  variant="danger ">
                     <Alert.Heading>Cher(e) {localStorage.getItem("name")}</Alert.Heading>
                     Désolé, Vous n'avez pas le droit d'envoyer une autre réservation pour ce centre 
                    
                </Alert>                    
                }
                {(this.state.HadGame ) &&
                <Alert  variant="success ">
                     <Alert.Heading>Cher(e) {localStorage.getItem("name") } Vous avez un match cette semaine à ce centre :</Alert.Heading>
             
                </Alert>                    
                }
                <div>
                <form onSubmit={this.onSend} className="form1"  >
                
               
                <div className="form-group1">
                    <label htmlFor="">Centre</label>
                       
                    <select required className="form-control1" onChange={this.onChangeCentre}  disabled={this.state.isSaved || this.state.alreadyReserve || this.state.HadGame} >
                        <option value='' ></option>
                    {this.state.centres.map(centre=>(
                        <option key={centre._id} value={centre._id}>{centre.NomCentre}</option>
                            ))}
                    </select>
                </div>
                
                <div className="form-group1" >
                    <label htmlFor="">Date du Match</label>
                    <DatePicker 
                        className="form-control1"  
                        onChange={this.onChangeDate} 
                        selected={this.state.DateDeMatch}
                        minDate={addDays(new Date(this.state.DateDeDebut),this.state.numberReservation)}
                        maxDate={new Date(this.state.DateDeFin)}
                        placeholderText="Selectionner date de Match"
                        disabled={this.state.alreadyReserve || this.state.isSaved || this.state.HadGame}
                        required={true}
                        />
                </div>
                <div className="form-group1">
                    <label htmlFor="">Heure du Match</label>
                    <select className="form-control1" onChange={this.onChangeHeure}  disabled={this.state.alreadyReserve || this.state.HadGame}>
                        <option value='' ></option>
                        {this.state.HoursGame.map(HourGame=>(
                            <option key={HourGame._id} value={HourGame._id}>{HourGame.HeureDebut}:00h-{HourGame.HeureFin}:00h </option>
                        ))}
                    </select>
                </div>
               
            
            
                <button type="submit" className="btn-send"  disabled={this.state.alreadyReserve} >Envoyer</button>
                </form>

                </div>
            </div>
             
            
             )
    }
}
