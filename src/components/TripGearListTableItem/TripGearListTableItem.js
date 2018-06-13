import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import ButtonDeleteForever from '../ButtonDeleteForever/ButtonDeleteForever';
import ButtonAddCircleOutline from '../ButtonAddCircleOutline/ButtonAddCircleOutline';

const mapStateToProps = state => ({
    state,
    user: state.user
});

class TripGearListTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell className="tableCell">{this.props.item.description}</TableCell>
                <TableCell padding='none'>{this.props.item.quantity}</TableCell>
                {this.props.item.username ?
                    (this.props.item.username == this.props.user.userName ?
                        <TableCell className="tableCell">
                            <Chip
                                className="provider-chip-user"
                                label="You"
                                onDelete={() => { this.props.handleClickRemoveProvider(this.props.item) }}
                            />
                        </TableCell>
                        :
                        <TableCell className="tableCell">
                            <Chip
                                className="provider-chip-other"
                                label={this.props.item.username}
                                onDelete={() => { this.props.handleClickRemoveProvider(this.props.item) }}
                            />
                        </TableCell>
                    )
                    :
                    <TableCell className="tableCell">
                        <ButtonAddCircleOutline onClick={() => { this.props.handleClickProvide(this.props.item) }} />
                        <Typography variant="body1">Provide
                            </Typography>
                    </TableCell>
                }
                <TableCell className="tableCell">
                    <ButtonDeleteForever onClick={() => { this.props.handleClickDelete(this.props.item) }} />
                </TableCell>
            </TableRow >
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripGearListTableItem);