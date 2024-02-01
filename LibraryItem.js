import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Library.css';

const LibraryItem = ({ item }) => {
    const { APIURL } = useContext(AuthContext);
    const imageUrl = `${APIURL}products/thumbs/${item.coverimage}`;

    return (
        <div className="library-item">
            <div className="item-image">
                <img src={imageUrl} alt={item.title} />
            </div>
            <div className="item-title">{item.title}</div> {/* Title as a separate element */}
            <div className="item-description">{item.description}</div> {/* Description as a separate element */}
            <div className="item-status">{item.status}</div>
        </div>
    );
};

export default LibraryItem;
