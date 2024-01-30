import React, {useState, useContext} from 'react';
import { AuthContext } from './AuthContext';
import './LibraryItem.css'; // Assuming you have a separate CSS file for this component


const LibraryItem = ({ item }) => {
    const { APIURL } = useContext(AuthContext);
    const imageUrl = `${APIURL}products/thumbs/${item.coverimage}`;
    return (
        <div className="library-item">
            <div className="item-image">
            <img src={imageUrl} alt={item.title} />
            </div>
            <div className="item-info">
                <div className="item-title">{item.title}</div>
                <div className="item-description">{item.description}</div>
            </div>
            <div className="item-status">{item.status}</div>
            <div className="item-record-status">{item.recordstatus}</div>
        </div>
    );
};

export default LibraryItem;
