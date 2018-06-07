import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {TRIP_ACTIONS} from '../../redux/actions/tripActions';
import UserTripListTableItem from '../UserTripListTableItem/UserTripListTableItem';

const mapStateToProps = state => ({
    state
});

class UserTripTable extends Component {

    confirmAction = (trip_id) => {
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
                    onClick: () => alert('aborted')
                }
            ]
        })
    };

    executeLeaveTrip = (trip_id) => {
        this.props.dispatch({ type: TRIP_ACTIONS.REQUEST_USER_LEAVE_TRIP, payload: trip_id})
    }


    handleClickDetails = (trip) => {
        this.props.dispatch({ type: TRIP_ACTIONS.SET_CURRENT_TRIP, payload: trip})
    }

    handleClickJoin = (trip_id) => {
        this.props.dispatch({ type: TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP, payload: trip_id})
    }


    handleClickLeave = (trip_id) => {
        this.confirmAction(trip_id);
    }
    
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>TRIP</TableCell>
                            <TableCell>START DATE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.state.trip.userTrips.map(item=> 
                        <UserTripListTableItem 
                        key={item.id} item={item} 
                        handleClickDetails={this.handleClickDetails}
                        handleClickJoin={this.handleClickJoin} 
                        handleClickLeave={this.handleClickLeave}
                        />)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTripTable);