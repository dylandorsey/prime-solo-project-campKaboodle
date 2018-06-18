import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import UserTripListTableItem from '../UserTripListTableItem/UserTripListTableItem';

const mapStateToProps = state => ({
    state
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

class UserTripTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
        }
    }

    confirmActionDeleteTrip = (trip) => {
        confirmAlert({
            title: 'Confirm delete trip',
            message: `Are you sure you want to delete trip: ${trip.name}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.executeDeleteTrip(trip)
                },
                {
                    label: 'No',
                    onClick: () => this.handleSnackBarOpen('Aborted')
                }
            ]
        })
    };

    confirmActionLeaveTrip = (trip_id) => {
        confirmAlert({
            title: 'Confirm leave trip',
            message: 'Are you sure you want to leave this trip?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.executeLeaveTrip(trip_id)
                },
                {
                    label: 'No',
                    onClick: () => this.handleSnackBarOpen('Aborted')
                }
            ]
        })
    };

    executeDeleteTrip = (trip) => {
        this.handleSnackBarOpen('Deleted trip');
        console.log('init handleClickDelete');
        const payload = { trip_id: trip.id };
        this.props.dispatch({
            type: TRIP_ACTIONS.DELETE_TRIP,
            payload
        });
        
    }

    executeLeaveTrip = (trip_id) => {
        this.props.dispatch({ type: TRIP_ACTIONS.REQUEST_USER_LEAVE_TRIP, payload: trip_id })
        this.handleSnackBarOpen('Left trip');
    }

    handleClickDelete = (tripID) => {
        this.confirmActionDeleteTrip(tripID);
    }

    handleClickDetails = (trip) => {
        this.props.dispatch({ type: TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP, payload: trip })
    }

    handleClickJoin = (trip_id) => {
        this.props.dispatch({ type: TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP, payload: trip_id })
        this.handleSnackBarOpen('Joined trip');
    }

    handleClickLeave = (trip_id) => {
        this.confirmActionLeaveTrip(trip_id);
    }

    handleSnackBarClose = () => {
        this.setState({
            open: false,
        });
    }

    handleSnackBarOpen = (newMessage) => {
        this.setState({
            snackBarMessage: [newMessage],
            open: true,
        });
    }

    render() {
        return (
            <div className="table">
                <Paper elevation={1} square={true}>
                    {/* <Table>
                    <TableBody> */}
                    {this.props.state.trip.userTrips.map(item =>
                        <UserTripListTableItem
                            key={item.id} item={item}
                            handleClickDetails={this.handleClickDetails}
                            handleClickJoin={this.handleClickJoin}
                            handleClickLeave={this.handleClickLeave}
                            handleClickDelete={this.handleClickDelete}
                        />)}
                    {/* </TableBody>
                </Table> */}
                </Paper>

                <Snackbar
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleSnackBarClose}
                    ContentProps={{
                        'aria-describedby': 'snackbar-fab-message-id',
                        className: this.props.classes.snackbarContent,
                    }}
                    message={<span id="snackbar-fab-message-id">{this.state.snackBarMessage}</span>}
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
}

UserTripTable.propTypes = {
    classes: PropTypes.object.isRequired,
};


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserTripTable));