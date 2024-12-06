import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

const UserContext = createContext<{
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const UserProvider: React.FC<{children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access the user context
export const useUser = () => {
  return useContext(UserContext);
};
