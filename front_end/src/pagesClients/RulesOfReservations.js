import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class RulesOfReservations extends Component {
    render() {
        return (
            <div className="container1">
                <Alert variant="warning" className="regle" >
              
                      <Alert.Heading>Bienvenus Mr, { localStorage.getItem("name")} dans votre espace</Alert.Heading>
                      <p>
                          Vous voulez suiver ces règles pour bien etablir votre réservation
                      </p>
                      <hr />
                      <div className="mb-0">
                        <ol >
                          <li>Vous avez le droit d'envoyer 6 réservations pour chaque centre</li>
                          <li>Vous avez le droit de modifier votre réservation une seule fois</li>
                          <li>Après vous envoyé vos réservations , vous devez attendre la décision de l'employé</li>
                        </ol>
                      </div>
              </Alert>
            </div>
        );
    }
}

export default RulesOfReservations;