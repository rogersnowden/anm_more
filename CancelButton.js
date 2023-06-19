import React from 'react';
import Button from '@mui/material/Button';

export default (props) => {
    return (
        <div>
        <Button variant="contained" color="primary"
            onClick={props.onClick}
            disabled={props.disabled}
            >
            Cancel
        </Button>
        </div>
    )
};
