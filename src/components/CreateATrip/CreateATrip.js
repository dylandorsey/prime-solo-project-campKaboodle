import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
});

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTrip: {
                message: '',
                name: '',
            },
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

    createNewTrip= () => {
        const payload = { newTrip: this.state.newTrip };
        this.props.dispatch({
            type: TRIP_ACTIONS.CREATE_NEW_TRIP,
            payload
        });
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newTrip: {
                ...this.state.newTrip,
                [propertyName]: event.target.value
            }
        });
    }

    logout = () => {
        this.props.dispatch(triggerLogout());
        this.props.history.push('home');
    }

    navToUserMainMenu = () => {
        console.log('init navToUserMainMenu');
        this.props.history.push('user-main-menu');
    }

    addUserToTrip = (body) => {
        axios.post(`api/trip/add-user`, body)
            .then((response) => {
                if (response.status === 200) {
                    alert('camper added');
                } else {
                    this.setState({
                        message: 'That didn\'t work. Server error...',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    message: 'That didn\'t work. Is the server running?',
                });
            });
    }


    renderAlert() {
        if (this.state.message !== '') {
            return (
                alert(this.state.message)
            )
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.newTrip.name === '') {
            alert('name must not be empty');
        } else {
            this.createNewTrip();
        }
    }

    render() {
        let content = null;
        if (this.props.user.userName) {
            content = (
                <div>
                    <h1
                        id=""
                    >
                        Create-A-Trip
                    </h1>
                    <Paper>
                        <form onSubmit={this.submitHandler}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Edit trip details below</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Trip Name</TableCell>
                                        <TableCell><input onChange={this.handleChangeFor('name')}></input></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Location</TableCell>
                                        <TableCell><input onChange={this.handleChangeFor('location')}></input></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Meetup Time</TableCell>
                                        <TableCell><input type="datetime-local" onChange={this.handleChangeFor('exit_spot')}></input></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Meetup Spot</TableCell>
                                        <TableCell><input onChange={this.handleChangeFor('meetup_spot')}></input></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Exit Time</TableCell>
                                        <TableCell><input type="datetime-local" onChange={this.handleChangeFor('exit_time')}></input></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Exit Spot</TableCell>
                                        <TableCell><input onChange={this.handleChangeFor('exit_spot')}></input></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <input type="submit" value="create new trip"></input>
                        </form>
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