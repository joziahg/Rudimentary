import React, { useState, useContext } from "react";

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!AppContext)
    return "useAppContext must be a child of an AppContext provider";
  return context;
};

export const AppContextConsumer = AppContext.Consumer;
