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
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
    user: state.user,
});

class UserPage extends Component {
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
                        Create-A-Trip
                    </h1>
                    <select>
                        <option>Trip 1</option>
                        <option>Trip 2</option>
                    </select>
                    <select>
                        <option>Trip Overview</option>
                        <option>Gear List</option>
                    </select>
                    <Paper>
                        <Table><TableBody>
                            <TableRow>
                                <TableCell>Location</TableCell>
                                <TableCell>Hardcoded location</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Meetup Time</TableCell>
                                <input>Hardcoded Meetup Time</input>
                            </TableRow>
                            <TableRow>
                                <TableCell>Meetup Spot</TableCell>
                                <TableCell>Hardcoded MeetupSpot</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Exit Time</TableCell>
                                <TableCell>Hardcoded Exit Time</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Exit Spot</TableCell>
                                <TableCell>Hardcoded Exit Spot</TableCell>
                            </TableRow>
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