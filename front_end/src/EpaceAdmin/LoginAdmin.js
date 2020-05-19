import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


class LoginAdmin extends Component {
    constructor(props){ 
        super(props);
        this.onChangeEmial=this.onChangeEmail.bind(this);
        this.onChangeMotDePass=this.onChangeMotDePass.bind(this);
      
        this.state={
            email:'',
            motdepass:'',
            isLogged:true
            }
        }

    onChangeEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    
    onChangeMotDePass=(e)=>{
        this.setState({
            motdepass:e.target.value
        })
    }

    LogAdmin=(e)=>{
        e.preventDefault();
        const Admin={
            email:this.state.email,
            motdepass:this.state.motdepass
        }
        axios.post(`http://localhost:9017/admins/loginAdmin`,Admin)
        .then(res=>{
            if(res.data.length===1){
              
                this.props.AdminLoggedIn();
                localStorage.setItem("idCentre",res.data[0].idCentre);
                localStorage.setItem("nameAdmin",res.data[0].Nom+' '+res.data[0].Prenom );

                this.props.history.push('/EspaceAdmin');
            }else {this.setState({ isLogged:false})}
        })
        .catch(err=>console.log(err))
    }
    
    render() {
        
        return (
            <div >
                <div className="login">
                    <div className="container" >
                        <div className="base-container" >
                            <div className="header-form">Login Admin</div> <br></br>
                                    {!this.state.isLogged &&
                                    <Alert variant="danger"  onClose={() =>this.setState({ isLogged:true})}  dismissible>
                                        <p>Votre E-mail ou le mot de passe incorrecte</p>
                        
                                    </Alert>
                                    }
                                <form onSubmit={this.LogAdmin} >
                                    <div className ="content" >
                                        <div className="form">
                                            <div className="form-group">
                                                <label htmlFor="e-mail">E-mail</label> 
                                                <input type="text" 
                                                    autoComplete="email" 
                                                    placeholder="E-mail" 
                                                    value={this.state.email} 
                                                    onChange={this.onChangeEmail}
                                                /> 
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="motdepasse">Mot de Passe</label> 
                                                <input type="password" 
                                                    autoComplete="current-password"
                                                    placeholder="Mot de Passe" 
                                                    value={this.state.motdepass}
                                                    onChange={this.onChangeMotDePass}
                                                 /> 
                                            </div>
                                        </div>   
                                    </div>
                                    <div className="footer-form">
                                        <button type="submit" className="btn1" >Login</button>
                                    </div>
                                </form>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}
export default withRouter(LoginAdmin)
