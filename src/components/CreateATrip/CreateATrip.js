import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import ButtonSendInvitation from '../ButtonSendInvitation/ButtonSendInvitation';

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

    createNewTrip = () => {
        const payload = { newTrip: this.state.newTrip };
        this.props.dispatch({
            type: TRIP_ACTIONS.CREATE_NEW_TRIP,
            payload
        });
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            newTrip: {
                [propertyName]: event.target.value
            }
        });
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
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <FormControl>
                                                <InputLabel htmlFor='trip-name'>Trip name</InputLabel>
                                                <Input
                                                    id='trip-name'
                                                    onChange={this.handleChangeFor('name')}
                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControl>
                                                <InputLabel htmlFor='trip-location'>Trip location</InputLabel>
                                                <Input
                                                    id='trip-location'
                                                    onChange={this.handleChangeFor('location')}

                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                id='meetup-time'
                                                label='Meetup time'
                                                onChange={this.handleChangeFor('meetup_time')}
                                                type="datetime-local"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControl>
                                                <InputLabel htmlFor='meetup-spot'>Meetup spot</InputLabel>
                                                <Input
                                                    id='meetup-spot'
                                                    onChange={this.handleChangeFor('meetup_spot')}
                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            {/* <InputLabel htmlFor='exit-time'>Exit Time</InputLabel> */}
                                            <TextField
                                                id='exit-time'
                                                label='Exit time'
                                                onChange={this.handleChangeFor('exit_time')}
                                                type="datetime-local"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <FormControl>
                                                <InputLabel htmlFor='exit-spot'>Exit spot</InputLabel>
                                                <Input
                                                    id='exit-spot'
                                                    onChange={this.handleChangeFor('exit')}
                                                />
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            { this.state.newTrip.name ? 
                            <ButtonSendInvitation onClick={this.submitHandler} />
                            :
                            <div></div>
                            }
                        </form>
                    </Paper>
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