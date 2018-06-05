import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import UserTripListTable from '../UserTripListTable/UserTripListTable';
import HamburgerMenuButton from '../HamburgerMenuButton/HamburgerMenuButton';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
  });
  
class UserTripList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.FETCH_USER_TRIPS })
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
                    <HamburgerMenuButton navToUserMainMenu={this.navToUserMainMenu} />
                    <h1
                        id=""
                    >

                        Your trips
                    </h1>
                    <UserTripListTable />

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
export default connect(mapStateToProps)(UserTripList);