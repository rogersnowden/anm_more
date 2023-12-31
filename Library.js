// Library.js
import React from 'react';
import './Library.css'; // Assuming you have a CSS file for styling

const Library = ({ items }) => {
    return (
        <div className="library-container">
            {items.map((item, index) => (
                <div key={index} className="library-item" onClick={() => {/* your click handler logic here */}}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span>{item.status}</span>
                </div>
            ))}
        </div>
    );
};

Library.defaultProps = {
    items: []
}

export default Library;
