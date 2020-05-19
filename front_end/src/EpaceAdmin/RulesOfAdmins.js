import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class RulesOfAdmins extends Component {
    render() {
        return (
            <div className="container1">
                <Alert variant="warning" className="regle" >
                                    
                <Alert.Heading>Bienvenus Mr, { localStorage.getItem("nameAdmin")} dans votre espace</Alert.Heading>
                      <p>
                          Vous voulez suiver ces règles pour bien etablir votre réservation
                      </p>
                      <hr />
                      <p className="mb-0">
                        <ol >
                          <li>aaa</li>
                          <li>aaa</li>
                          <li>aaa</li>
                        </ol>
                      </p>

              </Alert>
            </div>
        );
    }
}

export default RulesOfAdmins;