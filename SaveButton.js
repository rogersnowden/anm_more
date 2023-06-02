import React from 'react';
import Button from '@mui/material/Button';

export default (props) => {
    return (
        <div>
        <Button variant="contained" color="green"
            disabled={props.disabled}
            onClick={props.onClick}
            >
            Save
        </Button>
        </div>
    )
};
