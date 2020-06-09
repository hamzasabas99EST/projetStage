import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from 'react-bootstrap';


export default class UpdateReservation extends Component {
    constructor(props){ 
        super(props);  
       this.state={
            DateDeMatch:new Date(),
            Centre:'',
            HoursGame:[],
            idHourGame:'',
            disabled:false,
            Status:''
            
        } 
    }
    
    componentDidMount=()=>{
        axios.get(`http://localhost:9017/reservations/find/`+this.props.match.params.id)
        .then(res=>{
            this.setState({
                DateDeMatch:res.data.DateDeMatch,
                Centre:res.data.idCentre.NomCentre,
                idHourGame:res.data.idHourGame,
                Status:res.data.Status
            })
            if(this.state.Status==="Modifiée" /*|| this.state.Status==="Refusée"*/ ){
                this.setState({
                    disabled:true
                })
            }
    
        })

        
        axios.get(`http://localhost:9017/reservations/AllHours/`)
        .then(res=>{
            this.setState({
                HoursGame:res.data    
            })
        })
    }
    

    onChangeHeure=(e)=>{
        this.setState({
            idHourGame:e.target.value
        })
    }

  
    onSend=(e)=>{
        e.preventDefault();
       const idHourGame=this.state.idHourGame;
        axios.post(`http://localhost:9017/reservations/UpdateByClient/`+this.props.match.params.id,{idHourGame})
        .then(res=>{console.log(res.data)
            if(res.data.Status==="Modifiée"){
                this.setState({
                   disabled:true 
                })
            }
        })
        .catch(err=>console.log(err))
    }
    render() {
        return (
            <div className="container1">
             {this.state.disabled ? 
             <Alert  variant="success">
                   Cher(e) {localStorage.getItem("name")} cette réservation a été  bien modifiée, 
                   vous ne pourrez plus la remodifier une fois de plus.
            </Alert>
            :
            <Alert  variant="danger">
                   Cher(e) {localStorage.getItem("name")} Vous besoin de changer seulement l'heure du match 
            </Alert>                     
            }
            <div >
                <form className="form1" onSubmit={this.onSend}>
                <div className="form-group1">
                    <label htmlFor="">Centre</label>
                    <input className="form-control1" disabled value={this.state.Centre}/>
                </div>
                
                <div className="form-group1" >
                    <label htmlFor="">Date du Match</label>
                    <DatePicker 
                        className="form-control1"  
                        selected={new Date(this.state.DateDeMatch)}
                        disabled={true}
                        />
                </div>
                <div className="form-group1">
                    <label htmlFor="">Heure du Match</label>
                    <select className="form-control1"  onChange={this.onChangeHeure} value={this.state.idHourGame} disabled={this.state.disabled}>
                        {this.state.HoursGame.map(HourGame=>(
                        <option key={HourGame._id} value={HourGame._id}>{HourGame.HeureDebut}:00h-{HourGame.HeureFin}:00h </option>
                        ))}
                    </select>
                </div>
               
            
            
                <button type="submit" className="btn-send" disabled={this.state.disabled} >Modifier</button>
                  </form>

            </div>
                
                </div> 
            
        )
    }
}
