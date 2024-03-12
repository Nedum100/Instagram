import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { FirebaseContext } from './context/firebase';
import { firebaseApp, auth, FieldValue } from './lib/firebase';
import './styles/app.css';

const rootElement = document.getElementById('root');
// console.log('Firebase Context Provider Initialized');
createRoot(rootElement).render( 
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebaseApp, auth, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
);
