import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    handleClickDetails = () => {
        // dispatch action to set redux state's current trip to the selected trip
        // navigate to the trip overview page 
        // & ensure that page loads with the selected trip's info
    }

    handleClickJoin = () => {
        this.props.dispatch({ type: TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP})
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
                        handleClickJoin={this.handleClickJoin} 
                        handleClickDetails={this.handleClickDetails}
                        />)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTripTable);