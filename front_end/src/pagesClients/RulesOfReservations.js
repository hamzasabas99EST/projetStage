import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class RulesOfReservations extends Component {
    render() {
        return (
            <div className="container1">
                <Alert variant="warning" className="regle" >
              
                      <Alert.Heading>Bienvenue M(Mme), { localStorage.getItem("name")} dans votre espace</Alert.Heading>
                      <p>
                          Veuillez bien respecter ces règles afin que votre réservation puisse aboutir
                      </p>
                      <hr />
                      <div className="mb-0">
                        <ol >
                          <li>Vous avez le droit de réserver dans chaque centre.</li>
                          <li>chaque réservation par jour ( maximum 6 réservations tous les 6 jours pour chaque centre).</li>
                          <li>Vous avez le droit de modifier  votre réservation une seule fois .</li>
                          <li>Après avoir modifié votre réservation vous n'avez pas le droit de la supprimer .</li>
                          <li>Après avoir envoyé vos réservations , vous deveriez attendre la décision de l'employé .</li>
                          <li>Vous n'avez pas le droit de modifier ou de supprimer les réservations refuseés ou qui sont accepteés .</li>
                          <li>Dans un centre : l'une de vos réservations sera accepté et les autres seront réfusées automatiqement .</li>
                        </ol>
                      </div>
              </Alert>
            </div>
        );
    }
}

export default RulesOfReservations;