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
            <div className="tripTable-row">
                <div className="tripTable-row-tripName">

                    <p>{this.props.item.name}</p>
                </div>

                {this.props.item.user_hasAccepted ?
                    <div className="tripTable-row-tripActions">
                        <ButtonViewTripDetails onClick={() => { this.props.handleClickDetails(this.props.item) }} />
                        <ButtonLeaveTrip onClick={() => { this.props.handleClickLeave(this.props.item.id) }} />

                    </div>
                    :
                    <div className="tripTable-row-tripActions">

                        <ButtonJoinTrip onClick={() => { this.props.handleClickJoin(this.props.item.id) }
                        } />

                    </div>
                }
                <div className="tripTable-row-delete">
                    <ButtonDeleteForever onClick={() => { this.props.handleClickDelete(this.props.item) }} />
                </div>
            </div >
        );
    }
}

// this allows us to use <App /> in index.js
export default UserTripTableItem;