import React, { createContext, useState } from "react";

export const MailContext = createContext(null);

export const MailContextProvider = ({ children }) => {
  const [MailDetails, setMailDetails] = useState({
    mailItemDetails: {},
    showDetails: false,
    markFavorite: false,
  });

  return (
    <MailContext.Provider value={{ MailDetails, setMailDetails }}>
      {children}
    </MailContext.Provider>
  );
};
