import React, { Component } from 'react';
import { connect } from 'react-redux';

import CurrentViewIndicator from '../CurrentViewIndicator/CurrentViewIndicator';
import TripCamperListTable from '../TripCamperListTable/TripCamperListTable';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
    trip: state.trip,
    history: state.history,
});

class TripCamperList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        // this.props.history.push('home');
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
                    <CurrentViewIndicator currentViewName="Campers"/>
                    <TripCamperListTable />
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripCamperList);