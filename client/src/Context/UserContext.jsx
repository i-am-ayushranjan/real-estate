import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        isAuthenticated: false
    });

    const login = ({id, name, email}) => {
        setUser({
            id,
            name,
            email,
            isAuthenticated: true
        });
    };

    const logout = () => {
        setUser({
            id: null,
            name: '',
            email: '',
            isAuthenticated: false
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};
