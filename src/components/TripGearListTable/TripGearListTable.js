import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {TRIP_ACTIONS} from '../../redux/actions/tripActions';
import TripGearListTableItem from '../TripGearListTableItem/TripGearListTableItem';

const mapStateToProps = state => ({
    state
});

class TripGearListTable extends Component {

    handleClickJoin = () => {
        this.props.dispatch({ type: TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP})
    }
    
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ITEM</TableCell>
                            <TableCell>QUANTITY</TableCell>
                            <TableCell>PROVIDER</TableCell>
                            <TableCell>PACKED</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.state.trip.userTrips.map(item=> <TripGearListTableItem key={item.id} item={item} handleClickJoin={this.handleClickJoin}/>)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripGearListTable);