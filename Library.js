// Library.js
import React from 'react';
import './Library.css';

const Library = ({ items }) => {
    return (
        <div className="library-container">
            <div className="library-header">
                <span className="header-title">Title</span>
                <span className="header-description">Description</span>
                <span className="header-status">Status</span>
                <span className="header-record-status">Record Status</span>
            </div>
            {items.map((item, index) => (
                <div key={index} className="library-item">
                    <span className="item-title">{item.title}</span>
                    <span className="item-description">{item.description}</span>
                    <span className="item-status">{item.status}</span>
                    <span className="item-record-status">{item.recordstatus}</span>
                </div>
            ))}
        </div>
    );
};

Library.defaultProps = {
    items: []
}

export default Library;
