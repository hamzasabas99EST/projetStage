import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class RulesOfAdmins extends Component {
    render() {
        return (
            <div className="container1">
                <Alert variant="warning" className="regle" >
                                    
                <Alert.Heading>Bienvenus M(Mme), { localStorage.getItem("nameAdmin")} dans votre espace</Alert.Heading>
                      <p>
                        Veuillez bien suivre ces orientations pour une bonne manipulation de vos opérations
                      </p>
                      <hr />
                      <p className="mb-0">
                        <ol >
                          <li>Vous avez le droit d'accepter autant de réservations  que de terrains disponibles</li>
                          <li>Toutes les réservations autres que celles précédemment acceptées sont automatiquement refusées par le système</li>
                          <li>Toutes les réservations autres que celle que vous avez accepté pour un cllent seront refusées</li>
                          <li>la période de réservation s'étale entre le mardi et le dimance chaque semaine</li>
                          <li>Chaque client dont la réservation a été acceptée reçoit automatiquement un e-mail le lui rappelant.</li>
                        </ol>
                      </p>

              </Alert>
            </div>
        );
    }
}

export default RulesOfAdmins;