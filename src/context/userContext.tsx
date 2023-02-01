import { createContext, ReactNode, useState } from 'react';

type UserContextType = {
  loggedIn: boolean;
  setLoggedIn: () => void;
};
type UserContextProviderType = {
  children?: ReactNode;
};

const defaultState = {
  loggedIn: false,
  setLoggedIn: () => {},
};

export const UserContext = createContext<UserContextType>(defaultState);

export const UserContextprovider = ({ children }: UserContextProviderType) => {
  const [loggedIn, setLoggedIn] = useState(defaultState.loggedIn);

  const toggleLoggedIn = (value: boolean) => {
    setLoggedIn(value);
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        toggleLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
