import React, { Component } from 'react';
import { connect } from 'react-redux';

import ButtonDeleteForever from '../ButtonDeleteForever/ButtonDeleteForever';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const mapStateToProps = state => ({
    state
});

class TripCamperListTableItem extends Component {
    render() {
        return (
            <TableRow>
                <TableCell className="tableCell">
                {this.props.item.username}
                </TableCell>
                <TableCell className="tableCell">
                {this.props.item.user_hasAccepted ? "true" : "false"}
                </TableCell>
                <TableCell className="tableCell">
                    <ButtonDeleteForever onClick={() => 
                        { this.props.handleClickDelete(this.props.item) }} />
                </TableCell>
            </TableRow >
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripCamperListTableItem);