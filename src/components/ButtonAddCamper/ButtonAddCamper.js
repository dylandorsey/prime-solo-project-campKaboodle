import React from 'react';
import { GroupAdd } from '@material-ui/icons';

const ButtonAddCamper = props => (
        <GroupAdd  id={props.id} onClick={props.onClick} />
);

export default ButtonAddCamper;