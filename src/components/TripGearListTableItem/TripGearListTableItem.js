import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import ButtonDeleteForever from '../ButtonDeleteForever/ButtonDeleteForever';

const mapStateToProps = state => ({
    state
});

class TripGearListTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell padding='none'>{this.props.item.description}</TableCell>
                <TableCell padding='none'>{this.props.item.quantity}</TableCell>
                {this.props.item.username ?
                    <TableCell padding='none'>
                        <Chip
                            label={this.props.item.username}
                            onDelete={() => { this.props.handleClickRemoveProvider(this.props.item) }}
                        />
                    </TableCell>
                    :
                    <TableCell padding='none'>
                        <button onClick={() => { this.props.handleClickProvide(this.props.item) }}>Provide</button>
                    </TableCell>
                }
                <TableCell padding='none'>
                    <ButtonDeleteForever onClick={() => { this.props.handleClickDelete(this.props.item) }} />
                </TableCell>
            </TableRow >
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripGearListTableItem);