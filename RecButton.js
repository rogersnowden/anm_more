import React from 'react';
import Button from '@mui/material/Button';

export default (props) => {
    return (
        <Button disabled= {props.disabled} variant="contained" 
        onClick={props.onClick} >
        Record
        </Button>
    )
};
