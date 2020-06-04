import React, { Component } from 'react'
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import ball from '../images/ball1.png' ;

import {faQrcode, faLink, faStream, faCalendarWeek, faFutbol, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SideBarAdmin extends Component {
    render() {
        return (
            <div className="sidebar">
                <header className="sidebar-header"><img className="logo" src={ball} alt="" width="120" height="120" /> </header>
                
                <ul>
                    <li><Link to="/EspaceAdmin"><FontAwesomeIcon icon={faQrcode} /> Dashboard</Link></li>
                    <li><Link to="/EspaceAdmin/AjouterPeriode"><FontAwesomeIcon icon={faLink} />Ajouter Periode de Reservation </Link></li>
                    <li><Link to="/EspaceAdmin/Rules"><FontAwesomeIcon icon={faStream} /> Des   orientations</Link>  </li>
                    <li><Link to="/EspaceAdmin/Reservations"><FontAwesomeIcon icon={faCalendarWeek} /> Les réservations</Link></li>
                    <li><Link to="/EspaceAdmin/Games"><FontAwesomeIcon icon={faFutbol} /> Les Matchs</Link></li>
                    <li><Link to="/LoginAdmin" onClick={this.props.IsDeceonnectedAdmin}><FontAwesomeIcon icon={faSignOutAlt} /> Se déconnecter</Link></li>
                </ul>
            </div>
        )
    }
}
