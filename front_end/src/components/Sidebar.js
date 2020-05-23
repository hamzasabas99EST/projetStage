import React, { Component } from 'react';
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import ball from '../images/ball1.png' ;

import {faQrcode, faLink, faStream, faCalendarWeek, faFutbol, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default class Sidebar extends Component {
    


    checkConeccted=()=>{
        localStorage.clear();
        this.props.IsDeceonnected();
    }
    render() {
        return (
            <div className="sidebar">
                <header className="sidebar-header"><img className="logo" src={ball} alt="" width="120" height="120" /> </header>
                <ul>
                    <li><Link to="/EspaceClient"><FontAwesomeIcon icon={faQrcode} /> Dashboard</Link></li>
                    <li><Link to="/EspaceClient/Reservation"><FontAwesomeIcon icon={faLink} />  Ajouter Réservation </Link></li>
                    <li><Link to="/EspaceClient/Rules"><FontAwesomeIcon icon={faStream} /> Des régles</Link>  </li>
                    <li><Link to="/EspaceClient/MesReservations"><FontAwesomeIcon icon={faCalendarWeek} /> Mes réservations</Link></li>
                    <li><Link to="/EspaceClient/MesMatches"><FontAwesomeIcon icon={faFutbol} /> Mes Matches </Link></li>
                    <li><Link to="/Reserver" onClick={this.checkConeccted}><FontAwesomeIcon icon={faSignOutAlt} /> Se déconnecter</Link></li>
                </ul>
            </div>
        )
    }
}
