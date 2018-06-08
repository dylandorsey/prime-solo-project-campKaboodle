import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <TableCell>{this.props.item.user_username}</TableCell>
                <TableCell>{this.props.item.user_hasAccepted}</TableCell>
                <TableCell>
                    <button onClick={() => { this.props.handleClickDelete(this.props.item) }}>Delete Camper</button>
                </TableCell>
                <TableCell>
                    <Checkbox
                    />
                </TableCell>
            </TableRow >
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripCamperListTableItem);