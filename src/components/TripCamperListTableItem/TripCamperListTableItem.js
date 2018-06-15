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
            <div className="tripCamperListTableContentRow">
                <div className="tripCamperListTableContentRowUsername">
                {this.props.item.username}
                </div>
                <div className="tripCamperListTableContentRowHasAccepted">
                {this.props.item.user_hasAccepted ? "true" : "false"}
                </div>
                <div className="tripCamperListTableContentRowHasAccepted">
                    <ButtonDeleteForever onClick={() => 
                        { this.props.handleClickDelete(this.props.item) }} />
                </div>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripCamperListTableItem);