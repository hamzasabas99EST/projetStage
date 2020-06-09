import React, { Component } from 'react';
import { faFacebook,faInstagram, faGooglePlus } from "@fortawesome/free-brands-svg-icons"
import {faMap, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom"




export default class Footer extends Component {
    render() {
        return (
            <div>
                <div className="footer">
                    <div className="inner-footer">
                        <div className="footer-items">
                            <h1>The Wolves</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, quos voluptate. Quisquam assumenda 
                                animi exercitationem velit quibusdam quas autem similique hic neque fuga minus alias itaque amet, fugiat iste et!
                            </p>
                        </div>
                        <div className="footer-items">
                            <h1>Menu</h1>
                            <div className="border"></div>
                            <ul className="links">
                                <Link to="/"><li>Accueil</li></Link>
                                <Link to="/About"><li>À propos de nous</li></Link>
                                <Link to="/Services"><li>Services</li></Link>
                                <Link to="/Reserver"><li>Réserver</li></Link>
                            </ul>
                        </div>
                    
                        <div className="footer-items">
                            <h1>Contacter Nous</h1>
                            <div className="border"></div>
                            <ul className="contact">
                               <li><FontAwesomeIcon icon={faMap}  className="i"/> Marrakech 616 azli</li>
                               <li><FontAwesomeIcon icon={faPhone}  className="i"/> +2125243014</li>
                               <li><FontAwesomeIcon icon={faEnvelope}  className="i"/> thewolves@gmail.com</li>
                            </ul>
                            <div className="social-media">
                                <Link to=""><FontAwesomeIcon icon={faFacebook} size="lg" className="i"/></Link>                 
                                <Link to=""><FontAwesomeIcon icon={faInstagram} size="lg" className="i"/></Link>   
                                <Link to=""><FontAwesomeIcon icon={faGooglePlus} size="lg" className="i"/></Link>
                                
                            </div>
                        </div>
                    
                    </div>
                    <div className="footer-bottom">
                        Copyright &copy; Hamza Sabas 
                    </div>
                </div>
            </div>
        )
    }
}
