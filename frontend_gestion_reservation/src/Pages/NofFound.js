import React, { Component } from 'react';
import { faFacebook,faInstagram, faGooglePlus } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom"



export default class NofFound extends Component {
    render() {
        return (
            <div>
                    <div id="notfound">
                    <div className="notfound-bg">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1 className="title">404</h1>
                        </div>
                        <h2>Page Not Found</h2>
                        <p>Ce contenu n’est pas disponible actuellement.</p>
                        <Link to="/" className="a">Homepage</Link>
                        <div className="notfound-social">
                            <Link to=""><FontAwesomeIcon icon={faFacebook} size="lg" className="i"/></Link>                 
                            <Link to=""><FontAwesomeIcon icon={faInstagram} size="lg" className="i"/></Link>   
                            <Link to=""><FontAwesomeIcon icon={faGooglePlus} size="lg" className="i"/></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
