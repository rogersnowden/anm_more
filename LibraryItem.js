import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './Library.css';

const LibraryItem = ({ item }) => {
    const { APIURL, setProductSKU, setProductResponse } = useContext(AuthContext);
    const imageUrl = `${APIURL}products/thumbs/${item.coverimage}`;

    const handleItemSelect = (selectedItem) => {
        console.log("clicked on a book:", selectedItem); 
        setProductSKU(selectedItem.sku)
        setProductResponse('record');
        // You can now access selectedItem.title, selectedItem.description, etc.
    };
        
    return (
        <div className="library-item" onClick={() => handleItemSelect(item)}>
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
