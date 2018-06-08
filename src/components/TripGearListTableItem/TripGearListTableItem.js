import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const mapStateToProps = state => ({
    state
});

class TripGearListTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.item.description}</TableCell>
                <TableCell>{this.props.item.quantity}</TableCell>
                {this.props.item.username ?
                    <TableCell>
                        {this.props.item.username}
                        <button onClick={() => { this.props.handleClickRemoveProvider(this.props.item) }}>Cancel Provide</button>
                    </TableCell>
                    :
                    <TableCell>
                        <button onClick={() => { this.props.handleClickProvide(this.props.item) }}>Provide</button>
                    </TableCell>
                }
                <TableCell>
                    <Checkbox
                    />
                </TableCell>
            </TableRow >
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripGearListTableItem);