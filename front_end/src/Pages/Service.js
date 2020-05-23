import React, { Component } from 'react';
import medical from '../images/medical.png'
import vestaire from '../images/vestaire.png'
import douche from '../images/douche.png'
import ball from '../images/ball.png'
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
                        <p className="paragraph">Birdy is an independent online store, selling high-end iconic collectibles of action figures and props for lovers and newbies worldwide.</p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={vestaire} className="imag"/>
                        <h1 className="titleh1">Vestaire</h1>
                        <p className="paragraph">Chaque terrain a deux vestaire pour changer les tenus.</p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={douche} className="imag"/>
                         <h1 className="titleh1">Douches</h1>
                        <p className="paragraph">Birdy's designers keep the awards for design, creativity and innovation on the Internet. </p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={nettoyage} className="imag"/>
                         <h1 className="titleh1">service nettoyage</h1>
                        <p className="paragraph">Birdy's designers keep the awards for design, creativity and innovation on the Internet. </p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={assorage} className="imag"/>
                         <h1 className="titleh1">Douches</h1>
                        <p className="paragraph">Birdy's designers keep the awards for design, creativity and innovation on the Internet. </p>
                    </div>
                    <div className="ser">
                        <img alt="hello" src={ball} className="imag"/>
                         <h1 className="titleh1">Les equipements sportif</h1>
                        <p className="paragraph">Chaque centre contient des equipements sportif : balon, les tenus..  . </p>
                    </div>
                </div>
            </div>
        </div>
            
        )     
    }
}
