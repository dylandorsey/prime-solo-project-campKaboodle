import React from 'react';
import { Send } from '@material-ui/icons';

const ButtonSendInvitation = props => (
        <Send id={props.id} onClick={props.onClick} />
);

export default ButtonSendInvitation;