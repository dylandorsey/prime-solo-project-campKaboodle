import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Nav from '../../components/Nav/Nav';
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { navToDetails } from '../../redux/actions/navActions';
import ViewSelector from '../ViewSelector/ViewSelector';


const mapStateToProps = state => ({
    user: state.user,
    trips: state.trip.userTrips,
});

class TripOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrip: '',
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.FETCH_USER_TRIPS })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            [propertyName]: this.props.trips[event.target.value],
        });
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
    }

    navToTripGearList = () => {
        this.props.history.push('trip-gear-list');
    }

    navToUserMainMenu = () => {
        console.log('init navToUserMainMenu');
        this.props.history.push('user-main-menu');
    }

    navToTripOverview = () => {
        this.props.history.push('trip-overview');
    }

    render() {
        let content = null;
        let selectedTrip = this.state.selectedTrip;

        if (this.props.user.userName) {
            content = (
                <div>
                    <HamburgerMenuButton navToUserMainMenu={this.navToUserMainMenu} />
                    <h1
                        id=""
                    >
                        Trip Overview
                    </h1>
                    <ViewSelector
                        handleChangeFor={this.handleChangeFor}
                        navToTripOverview={this.navToTripOverview}
                        navToTripGearList={this.navToTripGearList}
                    />
                    {this.state.selectedTrip ?
                        <Paper>
                            <form onSubmit={this.submitHandler}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Trip Name</TableCell>
                                            <TableCell>{selectedTrip.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Location</TableCell>
                                            <TableCell>{selectedTrip.location}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Meetup Time</TableCell>
                                            <TableCell>{selectedTrip.meetup_time}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Meetup Spot</TableCell>
                                            <TableCell>{selectedTrip.meetup_spot}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Exit Time</TableCell>
                                            <TableCell>{selectedTrip.exit_time}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Exit Spot</TableCell>
                                            <TableCell>{selectedTrip.exit_spot}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Trip Gear</TableCell>
                                            <TableCell><button onClick={this.navToTripGearList}>View</button></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <input type="submit" value="edit trip"></input>
                            </form>
                        </Paper>
                        :
                        <p>Select a trip</p>
                    }
                    <button
                        onClick={this.logout}
                    >
                        Log Out
          </button>
                </div>
            );
        }
        return (
            <div>
                <Nav />
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripOverview);