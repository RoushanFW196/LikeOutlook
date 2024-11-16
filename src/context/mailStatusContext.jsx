import { createContext, useState } from "react";
export const MailStatuscontext = createContext(null);
export const MailStatuscontextProvider = ({ children }) => {
  const [mailStatus, setMailStatus] = useState({
    read: [],
    unRead: [],
    favorite: [],
  });

  return (
    <MailStatuscontext.Provider value={{ mailStatus, setMailStatus }}>
      {children}
    </MailStatuscontext.Provider>
  );
};
