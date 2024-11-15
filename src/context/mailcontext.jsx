import React, { createContext, useState } from 'react';

export const MailContext = createContext(null);

export const MailContextProvider = ({ children }) => {
  const [showMailDetails, setShowMailDetails] = useState(false);

  return (
    <MailContext.Provider value={ {showMailDetails, setShowMailDetails} }>
      {children}
    </MailContext.Provider>
  );
};
