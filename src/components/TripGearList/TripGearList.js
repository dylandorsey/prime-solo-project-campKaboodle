import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import TripGearListTable from '../TripGearListTable/TripGearListTable';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { GEAR_ACTIONS } from '../../redux/actions/gearActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
    userTrips: state.trip.userTrips,
    currentTrip: state.trip.currentTrip
});

class TripGearList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP });
        this.props.dispatch({ type: TRIP_ACTIONS.FETCH_USER_TRIPS })
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR, payload: this.props.currentTrip });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR, payload: this.props.currentTrip });
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

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1
                        id=""
                    >
                        Gear
                    </h1>
                    <TripGearListTable />
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

export default connect(mapStateToProps)(TripGearList);