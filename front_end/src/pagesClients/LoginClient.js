import React, { Component } from 'react'
import axios from 'axios';
import '../css/style.css';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


class LoginClient extends Component {
    constructor(props){ 
        super(props);  
        this.state={
            email:'',
            motdepass:'',
            message:'',
            isLogged:true
            
        } 
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

    Log=(e)=>{
        e.preventDefault();
        const client={
            email:this.state.email,
            motdepass:this.state.motdepass
        }

        axios.post(`http://localhost:9017/clients/login`,client)
        .then(res=>{ console.log(res)
             if(res.status===200){
                this.props.SetLoggedIn();
               localStorage.setItem("id",res.data.login._id);
               localStorage.setItem("idVille",res.data.login.idVille);
               localStorage.setItem("name",res.data.login.Nom+' '+res.data.login.Prenom );
               this.props.history.push('/EspaceClient/Rules');
              
             }
        })
       .catch(err=>{
             console.log(err.response.data.errPass)
                if(err.response.data.errPass){
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
            <div className="base-container" ref={this.props.containerRef}>
                <div className="header-form">Login</div><br></br>
                {!this.state.isLogged &&
                    <Alert variant="danger"  onClose={() =>this.setState({ isLogged:true})}  dismissible>
                        <p>{this.state.message}</p>
                    </Alert>
                }
                <form onSubmit={this.Log} >
                <div className ="content" >
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="e-mail">E-mail</label> 
                            <input type="text" required autoComplete="email" placeholder="E-mail" value={this.state.email} onChange={this.onChangeEmail}/> 
                        </div>
                        <div className="form-group">
                            <label htmlFor="motdepasse">Mot de Passe</label> 
                            <input type="password" required autoComplete="current-password" placeholder="Mot de Passe" value={this.state.motdepass} onChange={this.onChangePassword}/> 
                        </div>
                    </div>   
                </div>
                <div className="footer-form">
                    <button type="submit" className="btn1" >Login</button>
                </div>
                </form>
            </div>
        )
    }
}
export default withRouter(LoginClient)