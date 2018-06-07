import React, { Component } from 'react';
import { connect } from 'react-redux';
import Popover from '@material-ui/core/Popover';

import Nav from '../../components/Nav/Nav';
import Version from '../Version/Version';

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

    handlePopoverClick = event => {
        this.setState({
            ...this.state,
            anchorEl: event.currentTarget,
        });
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            anchorEl: null,
        });
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
        const { anchorEl } = this.state;

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1
                        id=""
                    >
                        User Main Menu
                    </h1>
                    <button onClick={this.handlePopoverClick}>
                        App Info
                    </button>
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <div>
                            <h2>
                                campKaboodle
                            </h2>
                            <p>
                                Version: <Version />
                            </p>
                            <p>
                                Author: Dylan Dorsey
                             </p>
                            <p>
                                This app is made possible by a bunch of stuff that none of us fully understands.
                             </p>
                            <p>
                                Thanks for giving it a try!
                             </p>
                        </div>
                    </Popover>
                    <h3>Hi, {this.props.user.userName}! Let's plan!</h3>

                    <button
                        onClick={this.navToCreateTrip}
                    >Create a trip
                    </button>
                    <button
                        onClick={this.navToTrips}
                    >Your trips
                    </button>
                    <button
                        onClick={this.navToUserGearInventory}
                    >Your gear
                    </button>
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
export default connect(mapStateToProps)(UserPage);