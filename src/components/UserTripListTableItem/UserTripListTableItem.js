import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import ButtonDeleteForever from '../ButtonDeleteForever/ButtonDeleteForever';
import ButtonLeaveTrip from '../ButtonLeaveTrip/ButtonLeaveTrip';
import ButtonViewTripDetails from '../ButtonViewTripDetails/ButtonViewTripDetails';
import ButtonJoinTrip from '../ButtonJoinTrip/ButtonJoinTrip';

class UserTripTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell
                    padding='none'
                >
                    {this.props.item.name}
                </TableCell>
                {this.props.item.user_hasAccepted ?
                    <TableCell
                        padding='none'
                    >
                        <ButtonViewTripDetails onClick={() => { this.props.handleClickDetails(this.props.item) }}/>
                        <ButtonLeaveTrip onClick={() => { this.props.handleClickLeave(this.props.item.id) }} />
                    </TableCell>
                    :
                    <TableCell
                        padding='none'
                    >
                        <ButtonJoinTrip onClick={() => { this.props.handleClickJoin(this.props.item.id) }} />
                    </TableCell>
                }
                <TableCell
                    padding='none'
                >
                    <ButtonDeleteForever onClick={() => { this.props.handleClickDelete(this.props.item) }} />
                </TableCell>
            </TableRow>
        );
    }
}

// this allows us to use <App /> in index.js
export default UserTripTableItem;