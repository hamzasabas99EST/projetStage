import React, { Component } from 'react';
import medical from '../images/medical.png'
import vestaire from '../images/vestaire.png'
import douche from '../images/douche.png'
import ball from '../images/soccer.png'
import nettoyage from '../images/nettoyage.jpg' 
import assorage from '../images/assorage.jpg' 

export default class Service extends Component {
    
    render() {
        return (
            
                <div className="container0">
            <div className="services">
                <div className="section_title">
                    <h1 className="titleh1">Services</h1>
                    <p className="paragraph">Check all our services</p>
                </div>
                
                <div className="services_boxs">
                    <div className="ser">
                        <img alt="hello" src={medical} className="imag"/>
                        <h1 className="titleh1">Service Médical</h1>
                        <p className="paragraph">Nos centres disposent d'infermiers pour les soins medicaux.</p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={vestaire} className="imag"/>
                        <h1 className="titleh1">Vestaires</h1>
                        <p className="paragraph">Chaque terrain dispose deux vestaire pour se changer .</p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={douche} className="imag"/>
                         <h1 className="titleh1">Douches</h1>
                        <p className="paragraph">Des douches sont disponible dans chaque centre. </p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={nettoyage} className="imag"/>
                         <h1 className="titleh1">service nettoyage</h1>
                        <p className="paragraph">Chaque centre dispose d'un personnel d'hygiène pour le confort des visiteurs. </p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={assorage} className="imag"/>
                         <h1 className="titleh1">Arrousage</h1>
                        <p className="paragraph">
                            Le centre assure un entrertien régulier
                         de la pelouse pour combiner esthétique et confort.
                        </p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={ball} className="imag"/>
                         <h1 className="titleh1">Les equipements sportif(s)</h1>
                        <p className="paragraph">Des équipements sont mis disposition:ballons-tenus-dossard...  . </p>
                    </div>
                </div>
            </div>
        </div>
            
        )     
    }
}
