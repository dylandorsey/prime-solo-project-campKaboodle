import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { TRIP_ACTIONS } from '../../redux/actions/tripActions';
import TripCamperListTableItem from '../TripCamperListTableItem/TripCamperListTableItem';

const mapStateToProps = state => ({
    user: state.user,
    trip: state.trip
});

class TripCamperListTable extends Component {

    confirmAction = (camper) => {
        const user_id = camper.user_id;
        confirmAlert({
            title: 'Confirm delete camper from trip',
            message: `Are you sure you want to remove ${camper.username} from the trip?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.executeDeleteCamper(user_id)
                },
                {
                    label: 'No',
                    onClick: () => alert('aborted')
                }
            ]
        })
    };

    executeDeleteCamper = (user_id) => {
        let payload = {
            user_id: user_id,
            trip_id: this.props.trip.currentTrip.id,
        };
        this.props.dispatch({ type: TRIP_ACTIONS.DELETE_CAMPER, payload });
    }

    handleClickDelete = (camper) => {
        this.confirmAction(camper);
    }

    render() {
        return (
            <Paper className="table" elevation={4} square={true}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell-header">
                                <Typography className="typography-header" variant="body2">
                                    Username
                            </Typography>
                            </TableCell>
                            <TableCell className="tableCell-header">
                            <Typography className="typography-header" variant="body2">
                                    Accepted Invitation
                            </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.trip.currentTripCamperList.map(item =>
                            <TripCamperListTableItem
                                key={item.user_id}
                                item={item}
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