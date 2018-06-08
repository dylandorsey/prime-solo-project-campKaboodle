import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import UserMainMenu from './components/UserMainMenu/UserMainMenu';
import UserTripList from './components/UserTripList/UserTripList';
import TripGearList from './components/TripGearList/TripGearList';
import TripCostEstimate from './components/TripCostEstimate/TripCostEstimate';
import InviteCampers from './components/InviteCampers/InviteCampers';
import EditCamperPermissions from './components/EditCamperPermissions/EditCamperPermissions';
import UserGearInventory from './components/UserGearInventory/UserGearInventory';
import CreateATrip from './components/CreateATrip/CreateATrip';
import TripCamperList from './components/TripCamperList/TripCamperList';
import TripMessageBoard from './components/TripMessageBoard/TripMessageBoard';
import TripOverview from './components/TripOverview/TripOverview';
// import HamburgerMenuButton from './components/HamburgerMenuButton/HamburgerMenuButton';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="campKaboodle" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/user-main-menu"
          component={UserMainMenu}
        />
        <Route
          path="/user-trip-list"
          component={UserTripList}
        />
        <Route
          path="/trip-overview"
          component={TripOverview}
        />
        <Route
          path="/trip-gear-list"
          component={TripGearList}
        />
        <Route
          path="/trip-cost-estimate"
          component={TripCostEstimate}
        />
        <Route
          path="/invite-campers"
          component={InviteCampers}
        />
        <Route
          path="/edit-camper-permissions"
          component={EditCamperPermissions}
        />
        <Route
          path="/user-gear-inventory"
          component={UserGearInventory}
        />
        <Route
          path="/create-a-trip"
          component={CreateATrip}
        />
        <Route
          path="/trip-camper-list"
          component={TripCamperList}
        />
        <Route
          path="/trip-message-board"
          component={TripMessageBoard}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </div>
);

export default App;
