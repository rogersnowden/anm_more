// LibraryItem.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import ProdService from "./services/prod.service";
import './Library.css';

const LibraryItem = ({ item }) => {
    const { APIURL, productSKU, setProductSKU, productResponse, setProductResponse, setUserBook, 
        setUserBookPageCount, userBookPageCount, userName } = useContext(AuthContext);
    const imageUrl = `${APIURL}products/thumbs/${item.coverimage}`;

    const handleItemSelect = (selectedItem) => {
        console.log("clicked on a book:" + selectedItem); 
        let SKU = selectedItem.sku;
        getUserBook(userName, SKU);
        setProductSKU(SKU)
        setProductResponse(selectedItem.status);
        // You can now access selectedItem.title, selectedItem.description, etc.
    };
        
    function localizeUserBook(thisBook) {
        let SKU= thisBook.sku;
        setUserBookPageCount(thisBook.bookcontents.length);
        for (let i=0; i< thisBook.bookcontents.length; i++) {
            let img = thisBook.bookcontents[i].image;
            let aud = thisBook.bookcontents[i].audio;
            thisBook.bookcontents[i].image = 
                `${APIURL}users/${userName}/mybooks/${SKU}/${img}`;
                console.log(" thisimageurl: " + thisBook.bookcontents[i].image);
                if (thisBook.bookcontents[i].audio) {
                    thisBook.bookcontents[i].audio = 
                    `${APIURL}users/${userName}/mybooks/${SKU}/${aud}`;
                console.log("kept audio: " + thisBook.bookcontents[i].audio);
                } else {
                    thisBook.bookcontents[i].audio = "";
                console.log(" no audio: " + thisBook.bookcontents[i].audio);
                }
        }
    };

// from params passed, get this book (productSKU)
    function getUserBook(userName, SKU) {
        console.log("FX 1");
        let isMounted = true; // Flag to track mounting status
    
        console.log("FX 1 userName, productSKU");
        console.log("userName,SKU: ", userName + " " + SKU);
    
        ProdService.getUserBook(userName, SKU)
        .then(data => {
            if (isMounted) { // Only update state if component is still mounted
            console.log("get user book successful", data);
            var thisBook= data;
            localizeUserBook(thisBook);
            setUserBook(data);
            }
        })
        .catch(error => {
            console.error("Error fetching book:", error);
        });
    
        // Cleanup function to set isMounted to false when component unmounts
        return () => {
        isMounted = false;
        };
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
