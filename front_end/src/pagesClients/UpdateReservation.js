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
            if(this.state.Status==="Updated" || this.state.Status==="Refuser" ){
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
        axios.post(`http://localhost:9017/reservations/UpdateByClient/`+this.props.match.params.id+`/`+idHourGame)
        .then(res=>{
            if(res.data.length!==1){
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
             {this.state.disabled &&  
             <Alert  variant="danger">
                   Cher(e) {localStorage.getItem("name")} vous avez bien modifier cette réservation
                   c'est vous return autre fois vous n'avez pas le droit de remodifier 
            </Alert>                    
            }
            <div >
                <form className="form1" onSubmit={this.onSend}>
                <div className="form-group1">
                    <label htmlFor="">Centre</label>
                    <input className="form-control1" disabled value={this.state.Centre}/>
                </div>
                
                <div className="form-group1" >
                    <label htmlFor="">Date de Match</label>
                    <DatePicker 
                        className="form-control1"  
                        selected={new Date(this.state.DateDeMatch)}
                        disabled={true}
                        />
                </div><br></br>
                <div className="form-group1">
                    <label htmlFor="">Heure de Match</label>
                    <select className="form-control1"  onChange={this.onChangeHeure} value={this.state.idHourGame} disabled={this.state.disabled}>
                        {this.state.HoursGame.map(HourGame=>(
                        <option key={HourGame._id} value={HourGame._id}>{HourGame.HeureDebut}:00h-{HourGame.HeureFin}:00h </option>
                        ))}
                    </select>
                    
                </div>
               
            
            
                <button type="submit" className="btn-send" disabled={this.state.disabled} >Submit</button>
                  </form>

            </div>
                
                </div> 
            
        )
    }
}
