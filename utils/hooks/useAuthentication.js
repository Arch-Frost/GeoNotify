import React from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth();

export const useAuthentication = () => {
    const [user, setUser] = React.useState();
    
    React.useEffect(() => {
        console.log("Use effect hook called in UseAuthentication")
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        return () => unsubscribe();
    }
    , []);

    return user;
}