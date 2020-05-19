import React , { Component } from 'react';

import MesReservations from './pagesClients/MesReservations';
import FormReservation from './pagesClients/FormReservation';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FormClient from './pagesClients/FormClient'
import { BrowserRouter as Router, Route,Switch  } from 'react-router-dom';
import MesMatches from './pagesClients/MesMatches';
import UpdateReservation from './pagesClients/UpdateReservation';
import LoginAdmin from './EpaceAdmin/LoginAdmin';
import SideBarAdmin from './components/SideBarAdmin';
import FormPeriode from './EpaceAdmin/FormPeriode';
import ListOfReservations from './EpaceAdmin/ListOfReservations';
import RulesOfReservations from './pagesClients/RulesOfReservations';
import DashboardClient from './pagesClients/DashboardClient';
import DashboardAdmin from './EpaceAdmin/DashboardAdmin';
import ListOfGames from './EpaceAdmin/ListOfGames';
import RulesOfAdmins from './EpaceAdmin/RulesOfAdmins';

import './css/style.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Service from './Pages/Service';
import NofFound from './Pages/NofFound';


class App extends Component {
  
  constructor(props) {
    super(props);
   
  //  this.TestDeconnection=this.TestDeconnection.bind(this);
  this.handleLoggINClient=this.handleLoggINClient.bind(this);
  this.handleLoggOutClient=this.handleLoggOutClient.bind(this);
  this.handleLoggINAdmin=this.handleLoggINAdmin.bind(this);
  this.handleLoggOutAdmin=this.handleLoggOutAdmin.bind(this);

   this.state={
       ClientLoggedIn :false,
       AdminLoggedIn:false,
    }
  }

  handleLoggINClient=()=>{
    this.setState({
      ClientLoggedIn :true
    })
}

handleLoggOutClient=()=>{
  this.setState({
    ClientLoggedIn :false
  })
}

handleLoggINAdmin=()=>{
    this.setState({
      AdminLoggedIn :true
    })
}

handleLoggOutAdmin=()=>{
this.setState({
  AdminLoggedIn :false
})


}

  render() {
    /*console.log(this.state.ClientLoggedIn)
    return (
      <MesReservations />
    );*/
  if(!this.state.ClientLoggedIn && !this.state.AdminLoggedIn){ 
    return (
        <Router>
        <div >
            <Navbar />
            <Switch>
                <Route exact path='/'  component={Home}  />
                <Route path='/About'  component={About}  />
                <Route path='/Services'  component={Service}  />
                <Route path='/Reserver'  component={()=><FormClient LoggedIn={this.handleLoggINClient}/>}  />
                <Route path='/LoginAdmin'  component={()=><LoginAdmin AdminLoggedIn={this.handleLoggINAdmin}/>}/>
                <Route component={NofFound}/>
            </Switch>
            <Footer />
        </div>
        </Router>
    );
  }else if(this.state.ClientLoggedIn && !this.state.AdminLoggedIn){
      return (
          <Router>
            <div>
              <Sidebar IsDeceonnected={this.handleLoggOutClient}/>
              <Switch>
                <Route exact path='/EspaceClient/' component={DashboardClient} />
                <Route path='/EspaceClient/Reservation' component={FormReservation} />
                <Route path='/EspaceClient/MesReservations' component={MesReservations} />
                <Route path='/EspaceClient/MesMatches' component={MesMatches} />
                <Route path='/EspaceClient/UpdateReservation/:id' component={UpdateReservation} />
                <Route path='/EspaceClient/Rules' component={RulesOfReservations} />
              </Switch>
              
            </div>
          </Router>
      );
  }else{
    return (
        <Router>
          <div>
            <SideBarAdmin IsDeceonnectedAdmin={this.handleLoggOutAdmin}/>
            <Route exact path='/EspaceAdmin/' component={DashboardAdmin} />
            <Route  path='/EspaceAdmin/AjouterPeriode' component={FormPeriode} />
            <Route  path='/EspaceAdmin/Rules' component={RulesOfAdmins} />
            <Route  path='/EspaceAdmin/Reservations' component={ListOfReservations} />
            <Route  path='/EspaceAdmin/Games' component={ListOfGames} />
            
          </div>
        </Router>
    );
}
}
}

export default App;