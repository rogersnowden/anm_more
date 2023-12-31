import React, { useState, useEffect, useContext } from 'react';
import Library from './Library';
import { AuthContext } from './AuthContext';
import ProdService from "./services/prod.service";
import AlertMessageDialog from './AlertMessage';
import AnmStyledAlert from './AnmStyledAlert';
import Overlay from './Overlay';

export default function AnmHome (libraryItems) {
  console.log("AnmHome begin");
    const { isLoggedIn, userName } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  

    return (
        <div>
            <Library items={libraryItems} />
        </div>
    );
};
