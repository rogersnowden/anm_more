// AnmHome.js
import React, { useState, useEffect, useContext } from 'react';
import Library from './Library';
import { AuthContext } from './AuthContext';
import ProdService from "./services/prod.service";
import AlertMessageDialog from './AlertMessage';
import AnmStyledAlert from './AnmStyledAlert';
import Overlay from './Overlay';

export default function AnmHome (props) {
  console.log("AnmHome begin");
    const { libraryItems } = props;
    const { isLoggedIn, userName } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
    useEffect(() => {
      console.log("anm home changes, login, lib" + isLoggedIn, libraryItems);
    }, [isLoggedIn, libraryItems]);
  
    return (
      <div>
        {isLoggedIn && (
            <Library items={libraryItems.librarycontents} />
            )}
      </div>
    );
};
