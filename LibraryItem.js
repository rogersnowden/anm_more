import React from 'react';
import './LibraryItem.css'; // Assuming you have a separate CSS file for this component

const LibraryItem = ({ item }) => {
    return (
        <div className="library-item">
            <div className="item-image">
            console.log(window.location.origin + '/cover_1.png');
            <img src={item.coverimage} alt={item.title} />
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
