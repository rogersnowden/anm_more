import React from 'react';
import Button from '@mui/material/Button';

export default (props) => {
    return (
        <Button disabled= {props.disabled} variant="contained" color="secondary"
        onClick={props.onClick} >
        Stop
        </Button>
    )
};
