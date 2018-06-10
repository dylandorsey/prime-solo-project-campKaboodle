import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import TripCamperListTableItem from '../TripCamperListTableItem/TripCamperListTableItem';

const mapStateToProps = state => ({
    user: state.user,
    trip: state.trip
});

class TripCamperListTable extends Component {

    confirmAction = (camper) => {
        const username = camper.username;
        confirmAlert({
            title: 'Confirm delete camper from trip',
            message: `Are you sure you want to remove ${username} from the trip?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.executeDeleteCamper(username)
                },
                {
                    label: 'No',
                    onClick: () => alert('aborted')
                }
            ]
        })
    };

    executeDeleteCamper = (username) => {
        let payload = { 
            username: username,
            trip_id: this.props.trip.currentTrip.id,
        };
        this.props.dispatch({ type: TRIP_ACTIONS.DELETE_CAMPER, payload});
    }

    handleClickDelete = (camper) => {
        this.confirmAction(camper);
    }

    render() {
        return (
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
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripCamperListTable);