import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TRIP_ACTIONS } from '../../redux/actions/tripActions';

import UserTripListTableItem from '../UserTripListTableItem/UserTripListTableItem';

const mapStateToProps = state => ({
    state
});

class UserTripTable extends Component {
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
                        {this.props.state.trip.userTrips.map(item=> <UserTripListTableItem key={item.id} item={item} />)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTripTable);