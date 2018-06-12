import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
// import Version from '../Version/Version';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
});

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        this.props.history.push('home');
    }

    navToCreateTrip = () => {
        this.props.history.push('create-a-trip');
    }

    navToTrips = () => {
        this.props.history.push('user-trip-list');
    }

    navToUserGearInventory = () => {
        this.props.history.push('user-gear-inventory');
    }

    render() {
        let content = null;

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1
                        id=""
                    >
                        User Main Menu
                    </h1>
                    <h3>Hi, {this.props.user.userName}! Let's plan your adventure!</h3>

                    <button
                        onClick={this.navToCreateTrip}
                    >Create a trip
                    </button>
                    <button
                        onClick={this.navToTrips}
                    >Your trips
                    </button>
                    {/* <button
                        onClick={this.navToUserGearInventory}
                    >Your gear
                    </button> */}
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
export default connect(mapStateToProps)(UserPage);