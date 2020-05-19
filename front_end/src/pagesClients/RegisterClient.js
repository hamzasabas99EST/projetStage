import React, { Component } from 'react'
import axios from 'axios';
import { Alert } from 'react-bootstrap';


export default class RegisterClient extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            CIN:'',
            Nom:'',
            Prenom:'',
            email:'',
            motdepass:'',
            motdepass1:'',
            idVille:'',
            villes:[],
            isSaved:'',
            pwdError:false,
            isHere:false
        } 
    }
    componentDidMount(){
        axios.get('http://localhost:9017/centres/villes')
        .then(res=>{
            this.setState({
                villes:res.data,
                idVille:res.data[0]._id
            })
        })
    }
    onChangeCin=(e)=>{
        this.setState({
            CIN:e.target.value
        })
    }
    
    onChangeNom=(e)=>{
        this.setState({
            Nom:e.target.value
        })
    }
    
    onChangePrenom=(e)=>{
        this.setState({
            Prenom:e.target.value
        })
    }

    onChangeVille=(e)=>{
        this.setState({
            idVille:e.target.value
        })
    }
    
    onChangeEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    
    onChangePassword=(e)=>{
        this.setState({
            motdepass:e.target.value
        })
    }
    onChangePassword1=(e)=>{
        this.setState({
            motdepass1:e.target.value
        })
    }
    findPlayer=(CIN)=>{
        axios.get('http://192.168.12:9017/equipes/findplayer')
        .then(reponse=>{
            this.setState({
                player:reponse.data
            })
        })
    }
    CheckClient=(CIN)=>{
        axios.get(`http://localhost:9017/clients/findClient/`+CIN)
        .then(res=>{if(res.data===true) {
            this.setState({
                isHere:true
            })
          }
        })
    }
    AddClient=async (e)=>{
        e.preventDefault();
        const CIN=await this.state.CIN;
        if(this.state.CIN!=='' && this.state.isHere===false){
           await this.CheckClient(CIN);
        } 
        else{
        const client={
            CIN:this.state.CIN,
            Nom:this.state.Nom,
            Prenom:this.state.Prenom,
            email:this.state.email,
            motdepass:this.state.motdepass,
            idVille:this.state.idVille
        }
        if(this.state.motdepass===this.state.motdepass1){
        axios.post(`http://localhost:9017/clients/add`,client)
        .then(res=>{
            if(res.status===200){
                this.setState({
                    isSaved:true,
                    pwdError:false
                })
            }
        })
        .catch(err=>console.log(err));
        }else this.setState({pwdError:true})
    }
    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                 
                <div className="header-form">Register</div>
                {this.state.isHere &&  
                <Alert  variant="danger" className="base-container">
                     <Alert.Heading>Ce client déja exist </Alert.Heading>
                </Alert>                    
                }
                {this.state.isSaved &&  
                <Alert  variant="success" className="base-container">
                     <Alert.Heading>Votre Compte est bien céer</Alert.Heading>
                </Alert>                    
                }
                {this.state.pwdError &&  
                <Alert  variant="danger" className="base-container">
                     <Alert.Heading>Le Mot de Pass incorrect</Alert.Heading>
                </Alert>                    
                }
               
                <form onSubmit={this.AddClient}>
                <div className ="content" >
                    <div className="form">
                    <div className="form-group">
                            <label htmlFor="CIN">CIN</label> 
                            <input type="text" placeholder="CIN" required  value={this.state.CIN}  onChange={this.onChangeCin}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="e-mail">Nom</label> 
                            <input type="text" placeholder="Nom" required value={this.state.Nom} onChange={this.onChangeNom}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="e-mail">Prenom</label> 
                            <input type="text" placeholder="Prenom" required value={this.state.Prenom} onChange={this.onChangePrenom}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="e-mail">Ville</label> 
                            <select  onChange={this.onChangeVille} required >
                              {this.state.villes.map(ville=>(
                                  <option key={ville._id} value={ville._id} >{ville.NomVille}</option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="e-mail">E-mail</label> 
                            <input type="text" placeholder="E-mail" required value={this.state.email} onChange={this.onChangeEmail}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="motdepasse">Mot de Passe</label> 
                            <input type="password" placeholder="Mot de Passe"  requiredvalue={this.state.motdepass}  autoComplete="current-password" onChange={this.onChangePassword}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="motdepasse">Répéter mot de passe</label> 
                                                   
                            <input type="password" placeholder="Répéter mot de passe"  required  autoComplete="current-password" value={this.state.motdepass1} onChange={this.onChangePassword1}/> 
                        </div>
                    </div>   
                </div>
                <div className="footer-form">
                    <button type="submit" className="btn1">Register</button>
                </div>
                </form>
            </div>
        )
    }
}
