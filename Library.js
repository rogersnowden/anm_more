import React, {useState, useContext} from 'react';
import { AuthContext } from './AuthContext';
import './Library.css';
import LibraryItem from './LibraryItem'; // Import the new component

const Library = ({ items }) => {
    const hasItems = items && items.length > 0;

    return (
        <div className="library-container">
            {hasItems && (
                <>
                    <div className="library-header">
                        <span className="header-title">My Library</span>
                    </div>
                    {items.map((item, index) => (
                        <LibraryItem key={index} item={item} />
                    ))}
                </>
            )}
            {!hasItems && (
                <div className="library-empty">
                </div>
            )} 
        </div>
    );
};

Library.defaultProps = {
    items: []
}

export default Library;



