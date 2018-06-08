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
import TripCamperListTableItem from '../TripCamperListTableItem/TripCamperListTableItem';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
    trip: state.trip
});

class UserPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP });
        this.props.dispatch({
            type: TRIP_ACTIONS.START_SAGA_SET_TRIP_CAMPER_LIST,
            payload: { trip_ID: this.props.trip.currentTrip.id }
        })
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
                        Campers coming on your trip:
                    </h1>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Accepted Invitation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                </TableRow>
                                {this.props.trip.currentTripCamperList.map(item =>
                                    <TripCamperListTableItem
                                        key={item.user_id} item={item}
                                        handleClickDelete={this.handleClickDelete}
                                    />)}
                            </TableBody>
                        </Table>
                    </Paper>
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