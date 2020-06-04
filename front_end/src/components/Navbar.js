import React, { Component } from 'react'
import '../css/style.css';
import ball from '../images/ball1.png' ;
import {Link} from "react-router-dom"

export default class Navbar extends Component {
    render() {
        return (
        <div>
        <header className="nav-header">
            <nav>
                <ul className="nav__links">
                <li><Link to="/">Acceuil</Link></li>
                <li><Link to="/About"> À propos de nous</Link></li> 
                <li><Link to="/Services">Services</Link></li>
                <li><Link to="/Reserver"><button className="navbar-button">Réserver</button></Link></li> 
                </ul>
            </nav>
            
            <Link to="/LoginAdmin"><img className="logo" src={ball} alt="" width="90" height="90" /></Link>
        </header>
        </div>
        )
    }
}


