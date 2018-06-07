import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class UserTripTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.item.name}</TableCell>
                <TableCell>{this.props.item.meetup_time}</TableCell>
                {this.props.item.user_hasAccepted ?
                    <TableCell>
                        <button onClick={() => {this.props.handleClickDetails(this.props.item)}}>Details</button>
                        <button onClick={() => {this.props.handleClickLeave(this.props.item.id)}}>Leave trip</button>
                    </TableCell>
                    :
                    <TableCell>
                        <button onClick={() => {this.props.handleClickJoin(this.props.item.id)}}>Join</button>
                    </TableCell>
                }
            </TableRow>
        );
    }
}

// this allows us to use <App /> in index.js
export default UserTripTableItem;