import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import TripGearListTable from '../TripGearListTable/TripGearListTable';
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton';
import ViewSelector from '../ViewSelector/ViewSelector';

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
        this.props.dispatch({ type: TRIP_ACTIONS.FETCH_USER_TRIPS })
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR, payload: this.props.currentTrip.trip_id });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        this.props.dispatch({ type: GEAR_ACTIONS.FETCH_TRIP_GEAR, payload: this.props.currentTrip });
    }

    // handleChangeFor = propertyName => event => {
    //     this.setState({
    //         [propertyName]: this.props.userTrips[event.target.value],
    //     });
    //     this.props.dispatch({
    //         type: TRIP_ACTIONS.SET_CURRENT_TRIP,
    //         payload: this.state.selectedTrip
    //     })
    // }

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

        if (this.props.user.userName) {
            content = (
                <div>
                    <HamburgerMenuButton navToUserMainMenu={this.navToUserMainMenu} />
                    <h1
                        id=""
                    >
                    </h1>
                    {/* <ViewSelector
                        handleChangeFor={this.handleChangeFor}
                        navToTripOverview={this.navToTripOverview}
                        navToTripGearList={this.navToTripGearList}
                        selectedTrip={this.state.selectedTrip}
                    /> */}
                    <TripGearListTable />

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

export default connect(mapStateToProps)(TripGearList);