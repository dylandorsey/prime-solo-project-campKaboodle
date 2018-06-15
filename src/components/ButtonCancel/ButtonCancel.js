import React from 'react';
import { Cancel } from '@material-ui/icons';

const ButtonCancel = props => (
        <Cancel id={props.id} onClick={props.onClick} />
);

export default ButtonCancel;