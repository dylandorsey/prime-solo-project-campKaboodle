import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
    user: state.user,
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
                        {/* {this.props.tripReducer.map(item => {
                  return (
                    <TableRow key={trip.id}>
                      <TableCell numeric>{trip.nickname}</TableCell>
                      <TableCell numeric>{trip.meetup_time}</TableCell>
                    </TableRow>
                  );
                })} */}
                        <TableRow>
                            <TableCell>hardcoded name</TableCell>
                            <TableCell>hardcoded date</TableCell>
                            {this.props.user.isAccepted ?
                                <button>Details</button>
                                :
                                <button>Join</button>}
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserTripTable);