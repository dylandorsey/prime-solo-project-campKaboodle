import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class UserTripTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.item.location}</TableCell>
                <TableCell>{this.props.item.meetup_time}</TableCell>
                <TableCell>{this.props.item.user_hasAccepted ?
                    <button onClick={this.props.handleClickDetails}>Details</button>
                    :
                    <button onClick={this.props.handleClickJoin}>Join</button>}
                </TableCell>
            </TableRow>
        );
    }
}

// this allows us to use <App /> in index.js
export default UserTripTableItem;