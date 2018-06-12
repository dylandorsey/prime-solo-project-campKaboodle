import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import CurrentViewIndicator from '../CurrentViewIndicator/CurrentViewIndicator';
import ButtonSendInvitation from '../ButtonSendInvitation/ButtonSendInvitation';


import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { TRIP_ACTIONS } from '../../redux/actions/tripActions';

const mapStateToProps = state => ({
    user: state.user,
});

const styles = theme => ({
    root: {
        position: 'relative',
        overflow: 'hidden',
    },
    appFrame: {
        width: 360,
        height: 360,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    button: {
        marginBottom: theme.spacing.unit,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    fabMoveUp: {
        transform: 'translate3d(0, -46px, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeOut,
        }),
    },
    fabMoveDown: {
        transform: 'translate3d(0, 0, 0)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
    },
    snackbar: {
        position: 'absolute',
    },
    snackbarContent: {
        width: 360,
    },
});

class CreateATrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTrip: {
                message: '',
                name: '',
            },
        }
    }

    clearInput = () => {
        this.setState({
            newTrip: {
                name: '',
                exit_spot: '',
                exit_time: '',
                location: '',
                meetup_spot: '',
                meetup_time: '',
            }
        });
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: TRIP_ACTIONS.UNSET_CURRENT_TRIP });
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
        this.handleSnackBarOpen();
        this.clearInput();
    }

    handleChangeFor = propertyName => event => {
        this.setState({
            ...this.state,
            newTrip: {
                ...this.state.newTrip,
                [propertyName]: event.target.value
            }
        });
    }

    handleSnackBarClose = () => {
        this.setState({
            open: false,
        });
    }

    handleSnackBarOpen = () => {
        this.setState({
            open: true,
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
                    <CurrentViewIndicator currentViewName="New Trip"/>
                    <Paper className="table" elevation={1} square="true">
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
                    <Snackbar
                        open={this.state.open}
                        autoHideDuration={4000}
                        onClose={this.handleSnackBarClose}
                        ContentProps={{
                            'aria-describedby': 'snackbar-fab-message-id',
                            className: this.props.classes.snackbarContent,
                        }}
                        message={<span id="snackbar-fab-message-id">Trip created</span>}
                        action={
                            <Button color="inherit" size="small" onClick={this.handleSnackBarClose}>
                                Close
                            </Button>
                        }
                        className={this.props.classes.snackbar}
                    />
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

CreateATrip.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CreateATrip));