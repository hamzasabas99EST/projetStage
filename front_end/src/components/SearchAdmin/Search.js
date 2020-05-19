import React, { Component } from 'react'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export class Search extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            HoursGame:[],
            idHourGame:'',
            DateDeMatch:'',
            DateDeDebut:'',
            DateDeFin:''
   
        }
    }

    componentDidMount=async()=>{
        await axios.get(`http://localhost:9017/reservations/allHours`)
        .then(res=>{
            this.setState({
                HoursGame:res.data,
                idHourGame:res.data[0]._id,
                
            })
        })
        .catch(err=>console.log(err));
        const idCentre=localStorage.getItem("idCentre");
       await axios.get(`http://localhost:9017/admins/findPeriod/`+idCentre)
          .then(res=>{
              this.setState({
                  DateDeDebut:res.data[0].DateDeDebut,
                  DateDeFin:res.data[0].DateDeFin,
                  DateDeMatch:new Date(res.data[0].DateDeDebut)

    
              })
          })
          .catch(err=>console.log(err));
          
    }
    
    onChangeHeure=(e)=>{
        this.setState({
            idHourGame:e.target.value
        })
    }
    
    onChangeDate=async(DateDeMatch)=>{
       await this.setState({
            DateDeMatch
        })
    }
    onSearch=(e)=>{
        e.preventDefault();
        this.props.searchReservation(this.state.DateDeMatch,this.state.idHourGame);
    }
    render() {
        console.log(this.props.DateDebut)
        return (
            <div>
               <form className="form-inline" onSubmit={this.onSearch}>
                <div className="form-group-search">
                    <label htmlFor=""> Date de Match</label>
                    <DatePicker 
                        className="form-control-search"  
                        selected={this.state.DateDeMatch}
                        onChange={this.onChangeDate} 
                        minDate={new Date(this.state.DateDeDebut)}
                        maxDate={new Date(this.state.DateDeFin)}
                        placeholderText="Selectionner Date"
                        />
                </div>
               <div className="form-group-search">
                    <label htmlFor="">Heure de Match</label>
                    <select className="form-control-search" onChange={this.onChangeHeure}>
                        {this.state.HoursGame.map(HourGame=>(
                          <option key={HourGame._id} value={HourGame._id}>{HourGame.HeureDebut}:00h-{HourGame.HeureFin}:00h </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-search">
                    <label htmlFor=""></label>
                    <button type="submit" className="search" ><FontAwesomeIcon icon={faSearch}  className="i"/></button>
                   
                </div>
              
              </form>  <br /><br /><br /><br />
            </div>
        )
    }
}

export default Search
