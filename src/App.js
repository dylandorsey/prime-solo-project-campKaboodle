import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// style imports
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

// component imports
import CreateATrip from './components/CreateATrip/CreateATrip';
import CurrentTripIndicator from './components/CurrentTripIndicator/CurrentTripIndicator';
import CurrentViewIndicator from './components/CurrentViewIndicator/CurrentViewIndicator';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import TripCamperList from './components/TripCamperList/TripCamperList';
import TripGearList from './components/TripGearList/TripGearList';
import TripOverview from './components/TripOverview/TripOverview';
import UserGearInventory from './components/UserGearInventory/UserGearInventory';
import UserMainMenu from './components/UserMainMenu/UserMainMenu';
import UserPage from './components/UserPage/UserPage';
import UserTripList from './components/UserTripList/UserTripList';

// Future functionality
import EditCamperPermissions from './components/EditCamperPermissions/EditCamperPermissions';
import TripCostEstimate from './components/TripCostEstimate/TripCostEstimate';
import TripMessageBoard from './components/TripMessageBoard/TripMessageBoard';
// End future functionality

import './styles/main.css';

// establish a color pallete
const myTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan,
    error: red,
    // constrastThreshold can be used to ensure differently-abled folks can see the site elements
    constrastThreshold: 3,
    tonalOffset: 0.2,
  }
});

const App = () => (
  <div>
    <MuiThemeProvider theme={myTheme}>

      <Router>
        <div>
          <Header title="campKaboodle" />
          <CurrentTripIndicator />
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
            {/* Future functionality */}
            {/* <Route
            path="/trip-cost-estimate"
            component={TripCostEstimate}
          /> */}
            {/* <Route
              path="/edit-camper-permissions"
              component={EditCamperPermissions}
            /> */}
            {/* <Route
              path="/trip-message-board"
              component={TripMessageBoard}
            /> */}
            {/* End future functionality */}

            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  </div>
);

export default App;
