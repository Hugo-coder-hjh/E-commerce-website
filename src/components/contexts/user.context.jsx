import { createContext, useState, useEffect } from "react";
import { 
onAuthStateChangedListener,
createUserDocumentFromAuth,
 } from "../../utils/firebase/firebase.utils";


// store the actual value you want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null
})
// make a functional tag to enable that the children (App) can fetch the value
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
  
    useEffect(()=>{
        const unsubscribe =  onAuthStateChangedListener((user)=>{
        //if user is true, we create the document (new: setdoc and return; old: return doc;)
         if (user){
             createUserDocumentFromAuth(user);
         }
         //no matter the user is null or an object, we need to set it to the current user
         setCurrentUser(user);
        });
        return unsubscribe;
     }, []);

    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
};



