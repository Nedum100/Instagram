// useAuthListener.js
import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      // We have a user, store the user in local storage
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // No authUser, clear local storage
        localStorage.removeItem('authUser');
        setUser(null);
      }
    });

    return () => listener(); // Unsubscribe when component unmounts

  }, [auth]); // Re-run the effect when 'auth' changes

  return user;
}
