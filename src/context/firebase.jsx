// FirebaseContextProvider.js
import { createContext, useContext } from 'react';
import { auth, firebaseApp, FieldValue } from '../lib/firebase';

export const FirebaseContext = createContext(null);

// eslint-disable-next-line react/prop-types
 const FirebaseContextProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firebaseApp, FieldValue }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default FirebaseContextProvider;



