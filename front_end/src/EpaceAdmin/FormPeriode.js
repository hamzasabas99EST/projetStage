import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { addDays } from 'date-fns';
import { Alert } from 'react-bootstrap';

export default class FormPeriode extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            DateDeDebut:'',
            DateDeFin:'',
            isSaved:false,
            

            
        } 
    }

    componentWillUpdate=async(nextProps,nextState) =>{
        if(nextState.DateDeDebut!==this.state.DateDeDebut){
            const DateFin=addDays(new Date(nextState.DateDeDebut),5)
            this.setState({
                DateDeFin:DateFin
            })
              
            }
    }

    onChangeDateDebut=async (DateDeDebut)=>{
         this.setState({
            DateDeDebut:DateDeDebut,
            
        })
    }

    isWeekday =(DateDeDebut)=> {
        
        const day = DateDeDebut.getDay()
        return day ===2
      }


 /*   onChangeDateFin=(DateDeFin)=>{
        this.setState({
            DateDeFin:DateDeFin
        })
    }
*/
    onSend=(e)=>{
        e.preventDefault();
        const Period={
            DateDeDebut:this.state.DateDeDebut,
            DateDeFin:this.state.DateDeFin,
            idCentre:localStorage.getItem("idCentre")
        }

        
        axios.post(`http://localhost:9017/admins/addPeriod`,Period)
        .then(res=>{
            if(res.status===200){
                this.setState({
                    isSaved:true
                })
            }
        })
        .catch(err=>console.log(err))
    }

    render() {
 
        
          
      
        return (
            <div  className="container1">
                {this.state.isSaved &&  
                <Alert  variant="success ">
                     <Alert.Heading>Cher(e) {localStorage.getItem("nameAdmin")}</Alert.Heading>
                     Vous avez bien Ajouter une période de la réservation
                    
                </Alert>                    
                }
            <div>
            <form onSubmit={this.onSend} className="form1">
            
            <div className="form-group1" >
                <label htmlFor="">Date de Debut</label>
                <DatePicker 
                    className="form-control1"  
                    onChange={this.onChangeDateDebut} 
                    selected={this.state.DateDeDebut}
                    placeholderText="Selectionner date de Debut"
                    filterDate={this.isWeekday}
                    />
            </div>
            <div className="form-group1" >
                <label htmlFor="">Date de Fin</label>
                <DatePicker 
                    className="form-control1"  
                    selected={this.state.DateDeFin}
                    placeholderText="Selectionner date de Fin"
                    disabled={true}
                    />
            </div><br></br>
           
        
            <button type="submit" className="btn-send" >Ajouter</button>
            </form>

            </div>
        </div>
        )
    }
}
