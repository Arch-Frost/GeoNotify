import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();

export const useAuthentication = () => {
    const [user, setUser] = React.useState('');
    
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }            
        });
        
        return () => unsubscribe();
    }
    , []);

    return user;
}