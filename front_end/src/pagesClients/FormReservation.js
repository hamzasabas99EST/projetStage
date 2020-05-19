import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import { addDays,subDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from 'react-bootstrap';



import '../css/styleForm.css'
import axios from 'axios';

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
            numberReservation:0,
            alreadyReserve:false
        }
        
        this.getCities=this.getCities.bind(this);
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
            this.getPeriode( idCentre );
            await this.getCient(idCentre);
        }

       
        }
    
    
    getCient=async(idCentre)=>{
        const  idClient=localStorage.getItem('id');

       await axios.get(`http://localhost:9017/reservations/client/`+idClient+'/'+idCentre)
        .then(res=>{
            if(res.data.length>=1 && res.data.length<6){
                this.setState({
                   numberReservation:res.data.length,
                   DateDeMatch:new Date(res.data[res.data.length-1].DateDeMatch)
                   
               })
           }else  if(res.data.length===6){
                this.setState({
                    alreadyReserve:true,
                    //DateDeMatch:res.data[0].DateDeMatch
                })
            
            }
                  })
      
      
    }

    getCities=(idVille)=>{
        axios.get(`http://localhost:9017/centres/findCentres/`+idVille)
        .then(res=>{
            this.setState({
                centres:res.data,
                
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
                DateDeMatch:new Date(res.data[0].DateDeDebut)

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

    onSend=(e)=>{
        e.preventDefault();
        const idClient=localStorage.getItem("id");
        const Reservation={
            DateDeMatch:this.state.DateDeMatch,
            idHourGame:this.state.idHourGame,
            idClient:idClient,
            idCentre:this.state.idCentre
        }
        console.log(Reservation)
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
                        DateDeMatch:'',
                        centres:[],
                        HoursGame:[]
                    })
                }
            }
        })
        .catch(err=>console.log(err))
        
    }
    
    render() {
        console.log(this.state.alreadyReserve+' '+this.state.numberReservation)
        
        return (
            <div  className="container1">
                {(this.state.isSaved ) &&
                <Alert  variant="success ">
                     <Alert.Heading>Cher(e) {localStorage.getItem("name")}</Alert.Heading>
                     Vous avez bien Envoyer cette réservation dans {`la date `+subDays(new Date(this.state.DateDeMatch),1).toLocaleDateString()},
                      Vous restes {``+6-this.state.numberReservation} reservations 
                </Alert>                    
                }
                {(this.state.alreadyReserve || this.state.numberReservation===6) &&  
                <Alert  variant="danger ">
                     <Alert.Heading>Cher(e) {localStorage.getItem("name")}</Alert.Heading>
                     Vous n'avez pas le droit d'Envoyer autre réservation
                    
                </Alert>                    
                }
                <div>
                <form onSubmit={this.onSend} className="form1"  >
                
               
                <div className="form-group1">
                    <label htmlFor="">Centre</label>
                       
                    <select required className="form-control1" onChange={this.onChangeCentre}  disabled={this.state.isSaved || this.state.alreadyReserve} >
                        <option value='' ></option>
                    {this.state.centres.map(centre=>(
                        <option key={centre._id} value={centre._id}>{centre.NomCentre}</option>
                            ))}
                    </select>
                </div>
                
                <div className="form-group1" >
                    <label htmlFor="">Date de Match</label>
                    <DatePicker 
                        className="form-control1"  
                        onChange={this.onChangeDate} 
                        selected={this.state.DateDeMatch}
                        minDate={addDays(new Date(this.state.DateDeDebut),this.state.numberReservation)}
                        maxDate={new Date(this.state.DateDeFin)}
                        placeholderText="Selectionner date de Match"
                        disabled={this.state.alreadyReserve || this.state.isSaved}
                        required={true}
                        />
                </div><br></br>
                <div className="form-group1">
                    <label htmlFor="">Heure de Match</label>
                    <select className="form-control1" onChange={this.onChangeHeure}  disabled={this.state.alreadyReserve}>
                        <option value='' ></option>
                        {this.state.HoursGame.map(HourGame=>(
                        <option key={HourGame._id} value={HourGame._id}>{HourGame.HeureDebut}:00h-{HourGame.HeureFin}:00h </option>
                        ))}
                    </select>
                </div>
               
            
            
                <button type="submit" className="btn-send"  disabled={this.state.alreadyReserve} >Submit</button>
                </form>

                </div>
            </div>
             
            
             )
    }
}
