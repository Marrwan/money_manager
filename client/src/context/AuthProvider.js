import React, {createContext} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider >
            {children}
        </AuthContext.Provider> // value is an object with auth and setAuth
    )

}
export default AuthContext;
