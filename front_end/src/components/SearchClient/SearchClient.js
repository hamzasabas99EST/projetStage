import React, { Component } from 'react'
import axios from 'axios';

export default class SearchClient extends Component {

    constructor(props){
        super(props);  
        this.state={
            Centres:[],
            idCentre:''
        }
        this.getCities=this.getCities.bind(this);
        this.onChangeCentre=this.onChangeCentre.bind(this);

    }
    componentDidMount=async()=>{
        const idVille=localStorage.getItem("idVille");
        await this.getCities(idVille);
        
    }
    getCities=(idVille)=>{
        axios.get(`http://localhost:9017/centres/findCentres/`+idVille)
        .then(res=>{
            this.setState({
                Centres:res.data,
                idCentre:res.data[0]._id
            })
        })
        .catch(err=>console.log(err));
    }

    onChangeCentre=async(e)=>{
        
        await this.setState({
            idCentre:e.target.value
        })

      await this.props.SearchReservations(this.state.idCentre);
    }
    render() {
        console.log(this.state.idCentre)
        return (
            <div>
               <div>
               <form className="form-inline-client" >
                
               <div className="form-group-search-client">
                    <label htmlFor="">Centre</label>
                    <select className="form-control-search-client" onChange={this.onChangeCentre}>
                        {this.state.Centres.map(centre=>(
                          <option key={centre._id} value={centre._id}>{centre.NomCentre}</option>
                        ))}
                    </select>
                </div>
              
              </form>  <br /><br /><br /><br />
            </div>  
            </div>
        )
    }
}
