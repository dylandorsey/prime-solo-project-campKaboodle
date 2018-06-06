import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

class TripGearListTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.item.description}</TableCell>
                <TableCell>{this.props.item.quantity}</TableCell>
                <TableCell>{this.props.item.username ?
                    this.props.item.username
                    :
                    <button onClick={this.props.handleClickProvide}>Provide</button>}
                </TableCell>
                <TableCell>
                    <Checkbox
                    />
                </TableCell>
            </TableRow>
        );
    }
}

// this allows us to use <App /> in index.js
export default TripGearListTableItem;