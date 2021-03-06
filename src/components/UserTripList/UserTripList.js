import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserTripListTable from '../UserTripListTable/UserTripListTable';

import CurrentViewIndicator from '../CurrentViewIndicator/CurrentViewIndicator';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
    state
});

class UserTripList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.FETCH_USER_TRIPS })
        this.props.dispatch({ type: TRIP_ACTIONS.START_UNSET_CURRENT_TRIP })
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
        if (this.props.state.trip.isLoading === false && this.props.state.trip.currentTrip != null) {
            this.props.history.push('trip-overview');
        }
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        this.props.history.push('home');
    }

    navToUserMainMenu = () => {
        console.log('init navToUserMainMenu');
        this.props.history.push('user-main-menu');
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <CurrentViewIndicator currentViewName="Your trips" />
                    <UserTripListTable />
                </div>
            );
        }

        return (
            <div>
                {/* <Nav /> */}
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTripList);