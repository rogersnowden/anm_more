import React from 'react';
import Button from '@mui/material/Button';

export default (props) => {
    return (
        <div>
        <Button variant="contained" color="primary"
            disabled={props.disabled}
            onClick={props.onClick}
            >
            Pause
        </Button>
        </div>
    )
};
