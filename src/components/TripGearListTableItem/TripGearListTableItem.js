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
            <div className="tripGearListTableContentRow">
                <div className="tripGearListTableContentRowItem">
                    {this.props.item.description}
                </div>
                <div className="tripGearListTableContentRowQuantity">
                    {this.props.item.quantity}
                </div>
                {this.props.item.username ?
                    (this.props.item.username == this.props.user.userName ?
                        <div className="tripGearListTableContentRowProvider">
                            <Chip
                                className="provider-chip-user"
                                label="You"
                                onDelete={() => { this.props.handleClickRemoveProvider(this.props.item) }}
                            />
                        </div>
                        :
                        <div className="tripGearListTableContentRowProvider">
                            <Chip
                                className="provider-chip-other"
                                label={this.props.item.username}
                                onDelete={() => { this.props.handleClickRemoveProvider(this.props.item) }}
                            />
                        </div>
                    )
                    :
                    <div className="tripGearListTableContentRowProvider">
                        <ButtonAddCircleOutline onClick={() => { this.props.handleClickProvide(this.props.item) }} />
                        <Typography variant="body1">Provide
                            </Typography>
                    </div>
                }
                <div className="tripGearListTableContentRowDelete">
                    <ButtonDeleteForever onClick={() => { this.props.handleClickDelete(this.props.item) }} />
                </div>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TripGearListTableItem);