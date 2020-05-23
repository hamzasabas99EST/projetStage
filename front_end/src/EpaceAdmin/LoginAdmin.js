import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


class LoginAdmin extends Component {
    constructor(props){ 
        super(props);
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeMotDePass=this.onChangeMotDePass.bind(this);
      
        this.state={
            username:'',
            motdepass:'',
            isLogged:true,
            message:''
            }
        }

    onChangeUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }
    
    onChangeMotDePass=(e)=>{
        this.setState({
            motdepass:e.target.value
        })
    }

    LogAdmin=(e)=>{
        e.preventDefault();
        const admin={
            username:this.state.username,
            motdepass:this.state.motdepass
        }
        axios.post(`http://localhost:9017/admins/loginAdmin`,admin)
        .then(res=>{console.log(res.data.admin)
            if(res.status===200){
                this.props.AdminLoggedIn();
                localStorage.setItem("idCentre",res.data.admin.idCentre);
                localStorage.setItem("nameAdmin",res.data.admin.Nom+' '+res.data.admin.Prenom );
                this.props.history.push('/EspaceAdmin/');
            }
        })
        .catch(err=>{
            console.log(err.response)
               if(err.response.data.errAdmin){
                   this.setState({
                       message:err.response.data.message,
                       isLogged:false
       
                   }) 
               }else {
                   this.setState({
                   message:err.response.data.message,
                   isLogged:false
   
               }) 
           }
           }
           
      );
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
                                        <p>{this.state.message}</p>
                        
                                    </Alert>
                                    }
                                <form onSubmit={this.LogAdmin} >
                                    <div className ="content" >
                                        <div className="form">
                                            <div className="form-group">
                                                <label htmlFor="e-mail">Username</label> 
                                                <input type="text" 
                                                    autoComplete="username" 
                                                    placeholder="username" 
                                                    value={this.state.username} 
                                                    onChange={this.onChangeUsername}
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
