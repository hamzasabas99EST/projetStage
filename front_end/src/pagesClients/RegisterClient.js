import React, { Component } from 'react'
import axios from 'axios';
//import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';


export default class RegisterClient extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            CIN:'',
            Nom:'',
            Prenom:'',
            telephone:'',
            email:'',
            motdepass:'',
            motdepass1:'',
            idVille:'',
            villes:[],
         
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
    onChangeTele=(e)=>{
        this.setState({
            telephone:e.target.value
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
    
    CheckClient=(CIN,email)=>{
        axios.get(`http://localhost:9017/clients/findClient/`+CIN+`/`+email)
        .then(res=>{
            if(res.data) {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Ce client déja exist dans le système!',
                text: "Changer l'email ou bien CIN",
               
              })
          }
        })
    }
    AddClient=async (e)=>{
        e.preventDefault();
        const CIN=await this.state.CIN;
        const email=await this.state.email;
        /*
        else{*/
        const client={
            CIN:CIN,
            Nom:this.state.Nom,
            Prenom:this.state.Prenom,
            telephone:this.state.telephone,
            email:this.state.email,
            motdepass:this.state.motdepass,
            idVille:this.state.idVille
        }
        if(this.state.isHere===false){
            await this.CheckClient(CIN,email);
            
         } 
        if(this.state.motdepass!==this.state.motdepass1){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'le mot de passe ne correspond pas!',
               
              })
        }else{console.log(client)
            axios.post(`http://localhost:9017/clients/add`,client)
            .then(res=>{
                if(res.status===200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Votre compte est bien céer ...',
                        text: 'Vous pouvez accedez a votre compte!',
                       
                    })
                    this.setState({
                        CIN:'',
                        Nom:'',
                        Prenom:'',
                        telephone:'',
                        email:'',
                        motdepass:'',
                        motdepass1:'',
                        
                    })
                }
                
            })
            .catch(err=>console.log(err.response));
            
        }
    //}
    }

    

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
                 
                <div className="header-form">Register</div>
                {/*this.state.isHere &&  
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
                */}
               
                <Form onSubmit={this.AddClient}>
                    <div className ="content row" >
                        <div className="form ">
                            <div  className="row">
                                <div className="form-group col">
                                    <label htmlFor="CIN">CIN</label> 
                                    <Input type="text" placeholder="CIN"
                                           required  value={this.state.CIN}
                                          onChange={this.onChangeCin}
                                          validations={[vCIN]}
                                    /> 
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="Nom">Nom</label> 
                                    <input type="text" placeholder="Nom" required value={this.state.Nom} onChange={this.onChangeNom}/> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group  col">
                                    <label htmlFor="Prenom">Prenom</label> 
                                    <input type="text" placeholder="Prenom" required value={this.state.Prenom} onChange={this.onChangePrenom}/> 
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="e-mail">E-mail</label> 
                                    <Input type="text" placeholder="exemple@exemple.com" 
                                            required value={this.state.email} 
                                            onChange={this.onChangeEmail}
                                            validations={[vEmail]}
                                    /> 
                                </div>
                            </div>
                            <div className="row">
                               
                               <div className="form-group col">
                                   <label htmlFor="e-mail">Ville</label> 
                                   <select  onChange={this.onChangeVille} required >
                                   {this.state.villes.map(ville=>(
                                       <option key={ville._id} value={ville._id} >{ville.NomVille}</option>
                                   ))}
                               </select>
                               </div>
                               <div className="form-group col">
                                   <label htmlFor="telephone">Telephone</label> 
                                   <input type="text" placeholder="Telephone" required value={this.state.telephone} onChange={this.onChangeTele}/> 
                               </div>
                           </div>
                            <div  className="row">
                                
                                <div className="form-group col">
                                    <label htmlFor="motdepasse">Mot de Passe</label> 
                                    <Input type="password" 
                                     placeholder=" mot de passe" 
                                     value={this.state.motdepass} 
                                     onChange={this.onChangePassword}
                                     autoComplete="current-password" 
                                     required
                                     name="password"
                                     validations={[vpassword]}
                                     /> 
                                </div>
                                <div className="form-group col">
                                    <label htmlFor="motdepasse">Répéter mot de passe</label> 
                                    <Input type="password" 
                                     placeholder="Répéter mot de passe" 
                                      required 
                                     autoComplete="current-password" 
                                     value={this.state.motdepass1} 
                                     onChange={this.onChangePassword1}
                                     validations={[vpassword]}
                                     
                                     /> 
                                </div>
                            </div>
                         
                            <div className="footer-form ">
                                <button type="submit" className="btn1">Inscription</button>
                            </div>
                        </div>   
                    </div>
                </Form>
            </div>
        )
    }
}

const vpassword=value=>{
    if(value.length<6){
        return(
            <div >
               <span className="badge badge-warning px-md-4">le mot de passe doit contenir au moins 6 caractères</span>
            </div>
        )
    }
}


const vCIN=value=>{
    if(value.length<6){
        return(
            <div >
               <span className="badge badge-warning px-md-4">CIN doit contenir au moins 6 caractères</span>
            </div>
        )
    }
}

const vEmail=value=>{
    if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
    return(
        <div >
               <span className="badge badge-warning px-md-4">Email invalide</span>
        </div> 
    )
}
