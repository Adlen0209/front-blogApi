import { createContext, ReactNode, useState } from 'react';

type UserContextType = {
  loggedIn: boolean;
  setLoggedIn: () => void;
  userId: number | null;
  setUserId: (id: number) => void;
};
type UserContextProviderType = {
  children?: ReactNode;
};

const defaultState = {
  loggedIn: false,
  setLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
};

export const UserContext = createContext<UserContextType>(defaultState);

export const UserContextprovider = ({ children }: UserContextProviderType) => {
  const [loggedIn, setLoggedIn] = useState(defaultState.loggedIn);
    const [userId, setUserId] = useState<number | null>(defaultState.userId);

  const toggleLoggedIn = (value: boolean) => {
    setLoggedIn(value);
  };

  const toggleUserId = (value: null | number) => {
    setUserId(value);
}

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        toggleLoggedIn,
        userId,
        toggleUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
