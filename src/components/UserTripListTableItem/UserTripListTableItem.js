import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const mapStateToProps = state => ({
    state
});

class UserTripTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.item.location}</TableCell>
                <TableCell>{this.props.item.meetup_time}</TableCell>
                <TableCell>{this.props.item.user_hasAccepted ?
                    <button>Details</button>
                    :
                    <button>Join</button>}
                </TableCell>
            </TableRow>
        );
    }
}

// this allows us to use <App /> in index.js
export default UserTripTableItem;